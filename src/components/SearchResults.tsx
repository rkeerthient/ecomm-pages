import { useSearchActions } from "@yext/search-headless-react";
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
import { useEffect } from "react";
import { SortDropdown } from "./SortDropdown";
type SearchInputs = {
  verticalKey?: string;
  inpClasses: string;
  cardType: CardComponent<any>;
};
const SearchResults = ({ verticalKey, inpClasses, cardType }: SearchInputs) => {
  const searchActions = useSearchActions();
  useEffect(() => {
    verticalKey && searchActions.setVertical(verticalKey);
    searchActions.executeVerticalQuery();
  }, []);
  return (
    <div className="flex">
      <div className="w-64 shrink-0 mr-5">
        <StandardFacets />
      </div>
      <div className="flex-grow">
        <div className="flex flex-col items-baseline">
          <div className="flex flex-row gap-2 items-center mb-2 w-full">
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
  );
};

export default SearchResults;
