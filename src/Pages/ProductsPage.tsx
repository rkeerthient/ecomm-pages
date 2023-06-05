import { Divider } from "@mui/material";
import {
  Matcher,
  SelectableStaticFilter,
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
import PriceSlider from "../components/PriceSlider";
import { SortDropdown } from "../components/SortDropdown";
import ProductCard from "../components/Cards/ProductCard";
import Loader from "../components/Loader";

const ProductsPage = () => {
  const searchActions = useSearchActions();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
    searchActions.setVertical("products");
    searchActions.executeVerticalQuery().then(() => setLoading(false));
  }, []);
  const handleSliderChange = (priceValues: React.SyntheticEvent[]) => {
    const selectedFilters: SelectableStaticFilter[] = [];
    if (priceValues[0] && priceValues[1]) {
      const selectedFilter: any = {
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
      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <div className="w-64 shrink-0 mr-5 mt-4">
            <PriceSlider onPriceChange={handleSliderChange} />
            <Divider className="!my-6" />
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
              CardComponent={ProductCard}
              customCssClasses={{
                verticalResultsContainer: `grid grid-cols-3 gap-6 max-w-screen-xl`,
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

export default ProductsPage;
