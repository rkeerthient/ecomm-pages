import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import { BsEye } from "react-icons/bs";
import Product from "../../types/products";

const ProductCard = (props: CardProps<Product>): JSX.Element => {
  const { result } = props;

  return (
    <div className="w-fit dark:bg-black">
      <div className="relative  bg-black rounded-sm opacity-1 hover:opacity-50 ">
        {result.rawData.primaryPhoto && (
          <img
            src={result.rawData.primaryPhoto.image.url}
            alt=""
            className="!h-64 object-cover block w-screen"
          />
        )}
        <a
          href={result.rawData.slug}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center hover:opacity-100 opacity-0"
        >
          <BsEye className="text-primary-text-color dark:text-dark_icon_colors w-12 h-12" />
        </a>
      </div>
      <footer className="flex justify-between  items-center font-light p-2 py-4">
        <h5 className="font-normal dark:text-dark_primary dark:font-bold">
          {result.rawData.name}
        </h5>
        <p className="text-primary-text-color dark:font-semibold dark:text-dark_icon_colors">
          {result.rawData.c_price}
        </p>
      </footer>
    </div>
  );
};

export default ProductCard;
