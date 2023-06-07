import * as React from "react";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
  return (
    <div className="cart-btn-wrapper">
      <a href="/cart" className="text-2xl items-center flex gap-2">
        <span className="flex items-center relative">
          <FaShoppingCart className="h-6 ml-1 dark:text-cta-1-dark" />
          <span className="absolute -top-2 -right-4 w-4 h-4 flex items-center justify-center rounded-full text-xs p-3 bg-cta-1-dark text-white dark:bg-cta-1-dark">
            1
          </span>
          ≈
        </span>
      </a>
    </div>
  );
};

export default CartIcon;
