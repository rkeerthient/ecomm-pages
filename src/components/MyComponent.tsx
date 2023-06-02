import { Slider } from "@mui/material";
import {
  SortBy,
  Direction,
  SortType,
  useSearchActions,
} from "@yext/search-headless-react";
import * as React from "react";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const MyComponent: React.FC = () => {
  const [priceValues, setPriceValues] = useState<number[]>([]);
  const [range, setRange] = useState<number[]>([]);
  const answersActions = useSearchActions();
  const sortOpt: { label: string; sortBy: SortBy }[] = [
    {
      label: "Price: High to Low",
      sortBy: {
        field: "price.value",
        direction: Direction.Descending,
        type: SortType.Field,
      },
    },
    {
      label: "Price: High to Low",
      sortBy: {
        field: "price.value",
        direction: Direction.Ascending,
        type: SortType.Field,
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all([
          answersActions.setSortBys([sortOpt[0].sortBy]),
          answersActions.executeVerticalQuery(),
          answersActions.setSortBys([sortOpt[1].sortBy]),
          answersActions.executeVerticalQuery(),
        ]);

        const validResults = results.filter(
          (result) => result !== undefined
        ) as any[];

        const minPrice = Number(
          validResults[1].verticalResults.results[0].rawData.price.value
        );
        const maxPrice = Number(
          validResults[0].verticalResults.results[0].rawData.price.value
        );

        setPriceValues([minPrice, maxPrice]);
        setRange([minPrice, maxPrice]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePriceChange = (event: any, newValue: number | number[]) => {
    setPriceValues(newValue as number[]);
  };

  return (
    <>
      {priceValues.length == 2 && range.length == 2 ? (
        <>
          <div className="mb-4 font-bold">Price range</div>
          <div
            style={{
              margin: "auto",
              display: "block",
              width: "85%",
            }}
          >
            <Slider
              value={priceValues}
              min={range[0]}
              max={range[1]}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
            />
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                className="flex"
                style={{
                  border: "1px solid",
                  alignItems: "center",
                  width: "40%",
                }}
              >
                $
                <input
                  type="number"
                  value={priceValues[0]}
                  style={{ outline: "none" }}
                  className="w-full"
                  onChange={(e) => {
                    setPriceValues([Number(e.target.value), priceValues[1]]);
                    // setPriceValues([Number(e.target.value), priceValues[1]]);
                  }}
                />
              </div>
              <div>-</div>
              <div
                className="flex"
                style={{
                  border: "1px solid",
                  alignItems: "center",
                  width: "40%",
                }}
              >
                $
                <input
                  type="number"
                  value={priceValues[1]}
                  className="w-full"
                  style={{ outline: "none" }}
                  onChange={(e) => {
                    setPriceValues([priceValues[0], Number(e.target.value)]);
                    // setValue([value[0], Number(e.target.value)]);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default MyComponent;
