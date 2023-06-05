import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
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
import PriceSlider from "./PriceSlider";
import { Divider } from "@mui/material";
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
  const [initLoad, setInitLoad] = useState(false);
  useEffect(() => {
    setLoading(true);
    verticalKey && searchActions.setVertical(verticalKey);
    searchActions.executeVerticalQuery().then(() => setLoading(false));
  }, []);

  const handleSliderChange = (priceValues: React.SyntheticEvent[]) => {
    const selectedFilters: SelectableStaticFilter[] = [];
    if (priceValues[0] && priceValues[1]) {
      const selectedFilter:any = {
        displayName: `$${priceValues[0]} - $${priceValues[1]}`,
        selected: true,
        filter: {
          kind: "fieldValue",
          fieldId: "price.value",
          value: {
            start: {
              matcher: Matcher.GreaterThanOrEqualTo,
              value: priceValues[0],
            },
            end: { matcher: Matcher.LessThanOrEqualTo, value: priceValues[1] },
          },
          matcher: Matcher.Between,
        },
      };
      selectedFilters.push(selectedFilter);
      searchActions.setStaticFilters(selectedFilters);
      searchActions.executeVerticalQuery();
    }
  };

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
                {verticalKey === "products" && (
                  <>
                    <PriceSlider onPriceChange={handleSliderChange} />
                    <Divider className="!my-6" />
                  </>
                )}
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
