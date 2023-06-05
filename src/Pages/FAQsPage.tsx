import {
  Direction,
  SortBy,
  SortType,
  useSearchActions,
} from "@yext/search-headless-react";
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
  const sortConfig: Record<string, { label: string; sortBy: SortBy }> = {
    alpha_asc: {
      label: "Name: A-Z",
      sortBy: {
        field: "name",
        direction: Direction.Ascending,
        type: SortType.Field,
      },
    },
    alpha_desc: {
      label: "Name: Z-A",
      sortBy: {
        field: "name",
        direction: Direction.Descending,
        type: SortType.Field,
      },
    },
    relevance: {
      label: "Relevance",
      sortBy: {
        type: SortType.Relevance,
      },
    },
  };

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
                <SortDropdown sortConfig={sortConfig} />
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
