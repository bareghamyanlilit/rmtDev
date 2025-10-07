type ResultCountProps = {
  totalNumbersOfResults: number;
};
export default function ResultsCount({
  totalNumbersOfResults,
}: ResultCountProps) {
  return <p className="count"><span className="u-bold">{totalNumbersOfResults}</span> results</p>;
}
