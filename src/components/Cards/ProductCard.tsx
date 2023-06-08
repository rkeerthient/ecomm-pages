import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { BsEye } from "react-icons/bs";
import Product from "../../types/products";

const ProductCard = (props: CardProps<Product>): JSX.Element => {
  const { result } = props;
  const { rawData } = result;
  const { name, primaryPhoto, c_price } = rawData;
  return (
    <div className="flex flex-col space-y-4">
      <img src={primaryPhoto?.image.url} alt="" />
      <div className="text-base gap-y-1 flex flex-col">
        <p className="text-heading font-medium">{name}</p>
        <p className="text-blue_cnt">{c_price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
