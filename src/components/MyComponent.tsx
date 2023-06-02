import { Slider } from "@mui/material";
import {
  SortBy,
  Direction,
  SortType,
  useSearchActions,
} from "@yext/search-headless-react";
import * as React from "react";
import { useEffect, useState } from "react";

const MyComponent: React.FC = () => {
  const [priceValues, setPriceValues] = useState<number[]>([0, 100]);

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
        await Promise.all([
          (answersActions.setSortBys([sortOpt[0].sortBy]),
          answersActions
            .executeVerticalQuery()
            .then((res: any) =>
              setPriceValues((prev: any) => [
                prev[0],
                Number(res.verticalResults.results[0].rawData.price.value),
              ])
            )),
          (answersActions.setSortBys([sortOpt[1].sortBy]),
          answersActions
            .executeVerticalQuery()
            .then((res: any) =>
              setPriceValues((prev: any) => [
                Number(res.verticalResults.results[0].rawData.price.value),
                prev[1],
              ])
            )),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {priceValues && (
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
              min={priceValues[0]}
              max={priceValues[1]}
              //   onChange={rangeSelector}
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
      )}
    </>
  );
};

export default MyComponent;
