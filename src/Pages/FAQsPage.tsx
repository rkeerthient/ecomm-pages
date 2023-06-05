import { useSearchActions } from "@yext/search-headless-react";
import {
  StandardFacets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
} from "@yext/search-ui-react";
import * as React from "react";
import { SortDropdown } from "../components/SortDropdown";
import Loader from "../components/Loader";
import { useEffect } from "react";
import FAQCard from "../components/Cards/FAQCard";

const FAQsPage = () => {
  const searchActions = useSearchActions();
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setLoading(true);
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery().then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <div className="w-64 shrink-0 mr-5 mt-4">
            <StandardFacets />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col items-baseline">
              <div className="flex flex-row gap-2 items-center mb-8 w-full">
                <ResultsCount
                  customCssClasses={{ resultsCountContainer: "mb-0" }}
                />
                <hr className="flex-1" />
                <SortDropdown />
              </div>
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={FAQCard}
              customCssClasses={{
                verticalResultsContainer: `max-w-screen-xl`,
              }}
            />
            <Pagination />
            <LocationBias />
          </div>
        </div>
      )}
    </>
  );
};

export default FAQsPage;
