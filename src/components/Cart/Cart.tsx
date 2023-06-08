import * as React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = ({ increase, decrease, amount }: any) => {
  return (
    <div className="grid grid-cols-3 w-1/3 my-8 items-center">
      <button type="button" className="w-8 h-4" onClick={decrease}>
        <FaMinus />
      </button>
      <h2 className="text-4xl">{amount}</h2>
      <button type="button" className="w-8 h-4" onClick={increase}>
        <FaPlus />
      </button>
    </div>
  );
};

export default Cart;
