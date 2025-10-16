import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalNumbersOfResults } = useJobItemsContext();
  return (
    <p className="count">
      <span className="u-bold">{totalNumbersOfResults}</span> results
    </p>
  );
}
