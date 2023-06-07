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
            <StandardFacets
              customCssClasses={{
                optionLabel: "dark:text-white",
                titleLabel: "dark:text-white",
                divider: "dark:bg-white",
                optionInput:
                  "dark:text-dark_icon_colors dark:focus:ring-dark_icon_colors",
              }}
            />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col items-baseline">
              <div className="flex flex-row gap-2 items-center mb-8 w-full">
                <ResultsCount
                  customCssClasses={{
                    resultsCountContainer:
                      "mb-0 dark:opacity-100 dark:text-dark_primary",
                  }}
                />
                <hr className="flex-1" />
                <SortDropdown sortConfig={sortConfig} />
              </div>
              <AppliedFilters
                customCssClasses={{
                  filterLabel: "dark:text-dark_primary",
                  appliedFiltersContainer:
                    "dark:opacity-100 dark:text-dark_primary",
                  clearAllButton: "dark:text-dark_icon_colors",
                  removableFilter: "dark:border-2 dark:border-dark_primary",
                }}
              />
            </div>
            <VerticalResults
              CardComponent={FAQCard}
              customCssClasses={{
                verticalResultsContainer: `max-w-screen-xl`,
              }}
            />
            <Pagination
              customCssClasses={{
                paginationContainer: "my-6",
                label: "dark:text-dark_primary",
                selectedLabel:
                  "dark:text-dark_icon_colors dark:border-dark_icon_colors dark:bg-black",
              }}
            />
            <LocationBias
              customCssClasses={{
                locationBiasContainer: "dark:!text-dark_primary",
                button: "dark:!text-dark_icon_colors",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FAQsPage;
