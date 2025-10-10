import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginbationControlsProps = {
  onClick: (direction: "next" | "previous") => void;
  totalNumberOfPages: number;
  currentPage: number;
};

export default function PaginationControls({
  onClick,
  totalNumberOfPages,
  currentPage,
}: PaginbationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginqationButton
          direction="previous"
          currentPage={currentPage}
          onClick={() => onClick("previous")}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginqationButton
          direction="next"
          currentPage={currentPage}
          onClick={() => onClick("next")}
        />
      )}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "next" | "previous";
  currentPage: number;
  onClick: () => void;
};

function PaginqationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination_button--${direction}`}
    >
      {direction === "previous" && (
        <>
          Page {currentPage - 1}
          <ArrowLeftIcon />
        </>
      )}
      {direction === "next" && (
        <>
          Page {currentPage + 1}
          <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
