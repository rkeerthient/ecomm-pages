import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  LocationBias,
  StandardFacets,
  CardComponent,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect, useState } from "react";
import { SortDropdown } from "./SortDropdown";
import StoreLocator from "./StoreLocator";
import Loader from "./Loader";
import MyComponent from "./MyComponent";
type SearchInputs = {
  verticalKey?: string;
  inpClasses: string;
  cardType: CardComponent<any>;
  isLocationType?: boolean;
};
const SearchResults = ({
  verticalKey,
  inpClasses,
  cardType,
  isLocationType = false,
}: SearchInputs) => {
  const searchActions = useSearchActions();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    verticalKey && searchActions.setVertical(verticalKey);
    searchActions.executeVerticalQuery().then(() => setLoading(false));
  }, []);
  return (
    <>
      {isLocationType ? (
        <StoreLocator />
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <div className="flex">
              <div className="w-64 shrink-0 mr-5 mt-4">
                <MyComponent></MyComponent>
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
                  CardComponent={cardType}
                  customCssClasses={{
                    verticalResultsContainer: `${inpClasses}`,
                  }}
                />
                <Pagination />
                <LocationBias />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchResults;
