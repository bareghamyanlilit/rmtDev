type ResultCountProps = {
  totalNumbersOfItems: number;
};
export default function ResultsCount({
  totalNumbersOfItems,
}: ResultCountProps) {
  return <p className="count"><span className="u-bold">{totalNumbersOfItems}</span> results</p>;
}
