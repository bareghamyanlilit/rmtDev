import { useContext, useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import { handleError } from "./utils";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";
import { ActiveIdContext } from "../contexts/ActiveIdContextProvider";
import { SearchTextContext } from "../contexts/SearchTextContextProvider";
import { JobItemsContext } from "../contexts/JobItemsContextProvider";

type JobItemApiResponse = {
    public: boolean,
    jobItem: JobItemExpanded
}

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
    const response = await fetch(`${BASE_API_URL}/${id}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description);
    }
    const data = await response.json();
    return data
};

export function useJobItem(id: number | null) {
    const { data, isInitialLoading } = useQuery(
        ['job-item', id],

        () => (id ? fetchJobItem(id) : null),

        {
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: !!id,
            onError: handleError
        }

    )

    const jobItem = data?.jobItem
    const isLoading = isInitialLoading
    return { jobItem, isLoading } as const
}
export function useJobItems(ids: number[]) {
    const result = useQueries({
        queries: ids.map(id => ({
            queryKey: ['job-item', id],
            queryFn: () => fetchJobItem(id),
            staleTime: 1000 * 60 * 60,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: !!id,
            onError: handleError
        })
        )
    })

    const jobItems = result
        .map(result => result.data?.jobItem)
        .filter(jobItem => Boolean(jobItem)) as JobItemExpanded[]

    const isLoading = result.some(result => result.isLoading)

    return {
        jobItems,
        isLoading
    }
}
//////////////////////////////////////////////////////////////////

type JobItemsApiResponse = {
    public: boolean,
    sorted: boolean,
    jobItems: JobItem[]
}

const fetchJobItems = async (searchText: string): Promise<JobItemsApiResponse> => {
    const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.description);
    }
    const data = await response.json();
    return data
};

export function useSearchQuery(searchText: string) {
    const { data, isInitialLoading } = useQuery(
        ['job-items', searchText],
        () => fetchJobItems(searchText),
        {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            retry: false,
            enabled: !!searchText,
            onError: handleError
        }
    )

    return {
        jobItems: data?.jobItems,
        isLoading: isInitialLoading
    } as const
}

///////////////////////////////////////////////////////////////////////////
export function useDebounce<T>(value: T, delay = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value);


    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearInterval(timerId)
    }, [value, delay]);

    return debouncedValue;
}

export function useActiveId() {

    const [activeId, setActiveId] = useState<number | null>(null);

    useEffect(() => {
        const handleHashChange = () => {
            const id = +window.location.hash.slice(1);
            setActiveId(id);
        };
        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return activeId;
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [value, setValue] = useState(() =>
        JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue] as const

}

export function useOnClickOutside(
    refs: React.RefObject<HTMLElement>[],
    handler: () => void
) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                e.target instanceof HTMLElement &&
                refs.every((ref) => !ref.current?.contains(e.target as Node))
            ) {
                handler()
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [refs, handler]);
}


export function useBookmarksContext() {
    const context = useContext(BookmarksContext);
    if (!context) {
        throw new Error(
            "useContext(BookmarksContext) must be used whitin a BookmarksContextProvider"
        );
    }
    return context;
}

export function useActiveIdContext() {
    const context = useContext(ActiveIdContext);
    if (!context) {
        throw new Error(
            "useActiveIdContext must be used whitin a ActiveIdContextProvider"
        );
    }
    return context;
}

export function useSearchTextContext() {
    const context = useContext(SearchTextContext);
    if (!context) {
        throw new Error(
            "useSearchTextContext must be used whitin a SearchTextContextProvider"
        );
    }
    return context;
}

export function useJobItemsContext() {
    const context = useContext(JobItemsContext);
    if (!context) {
        throw new Error(
            "useJobItemsContext must be used whitin a JobItemsContextProvider"
        );
    }
    return context;
}