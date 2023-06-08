import * as React from "react";
import { FiShoppingBag } from "react-icons/fi";

const CartIcon = () => {
  return (
    <div className="cart-btn-wrapper">
      <a href="/cart" className="text-2xl items-center flex gap-2">
        <span className="flex items-center relative">
          <FiShoppingBag className="h-6 ml-1  " />
          <span className="absolute -top-2 -right-4 w-4 h-4 flex items-center justify-center rounded-full text-xs p-3 !bg-blue_cnt text-white dark:bg-cta-1-dark">
            1
          </span>
        </span>
      </a>
    </div>
  );
};

export default CartIcon;
