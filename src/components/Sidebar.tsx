import JobList from "./JobList";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import PaginationControls from "./PaginationControls";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount/>
        <SortingControls/>
      </div>
      <JobList/>
      <PaginationControls/>
    </div>
  );
}
