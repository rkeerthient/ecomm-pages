import { Slider } from "@mui/material";
import {
  SortBy,
  Direction,
  SortType,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import * as React from "react";
import { useEffect, useState } from "react";
interface ChildComponentProps {
  onPriceChange: (newPrice: number) => void;
}
const PriceSlider = ({ onPriceChange }: any) => {
  const [priceValues, setPriceValues] = useState<number[]>([]);
  const [range, setRange] = useState<number[]>([]);
  const filters = useSearchState((state) =>
    state.filters.facets?.filter((item) => item.fieldId === "price.value")
  );
  const filterState: any = useSearchState((state) =>
    state.filters ? state.filters : {}
  );

  useEffect(() => {
    if (
      filterState &&
      filterState.static &&
      Array.isArray(filterState.static)
    ) {
      const staticSelected = filterState.static[0].selected;
      staticSelected
        ? console.log("The 'static' field is present in the JSON.")
        : setPriceValues(range);
    }
  }, [filterState]);

  useEffect(() => {
    if (filters) {
      const options = (filters[0] as any).options;
      const prices: number[] = options.reduce((acc: number[], option: any) => {
        if (option.value.start && option.value.end) {
          acc.push(option.value.start.value, option.value.end.value);
        }
        return acc;
      }, []);
      const minPrice: number = Math.min(...prices);
      const maxPrice: number = Math.max(...prices);
      setRange([minPrice, maxPrice]);
      setPriceValues([minPrice, maxPrice]);
    }
  }, []);

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPriceValues(newValue as number[]);
    onPriceChange(newValue as number[]);
  };

  return (
    <>
      {priceValues.length == 2 && range.length == 2 && (
        <div className="my-4 flex flex-col">
          <div className="dark:text-dark_primary mb-10 text-neutral-dark text-sm font-medium text-left">
            Price
          </div>
          <div className="m-auto block w-[85%]">
            <Slider
              value={priceValues}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `$${value}`}
              min={range[0]}
              max={range[1]}
              onChange={handlePriceChange}
              classes={{
                root: "dark:!text-dark_icon_colors !text-primary-text-color",
                valueLabel: "!bg-white !text-gray-600 !font-medium",
              }}
            />
            <div className="flex flex-row gap-5 justify-start  ">
              <div className="dark:bg-dark_primary flex w-1/2 p-1 items-center rounded-md border border-gray-300  text-gray-600 text-sm h-9">
                $
                <input
                  type="number"
                  value={priceValues[0]}
                  style={{ outline: "none" }}
                  className="w-full"
                  onChange={(e) => {
                    handlePriceChange(null, [
                      Number(e.target.value),
                      priceValues[1],
                    ]);
                  }}
                />
              </div>
              <div className="dark:bg-dark_primary flex w-1/2 p-1 items-center rounded-md border border-gray-300  text-gray-600 text-sm h-9 ">
                $
                <input
                  type="number"
                  value={priceValues[1]}
                  className="w-full"
                  style={{ outline: "none" }}
                  onChange={(e) => {
                    handlePriceChange(null, [
                      priceValues[0],
                      Number(e.target.value),
                    ]);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceSlider;
