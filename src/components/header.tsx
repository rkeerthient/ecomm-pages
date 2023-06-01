import * as React from "react";
import NavLinks from "./NavLinks";
import CartIcon from "./CartIcon";
import { SearchBar } from "@yext/search-ui-react";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";

const Header = ({ _site }: any) => {
  const { logo } = _site;
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <>
      <div className="centered-container">
        <nav className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <img src={logo?.image.url} width={"130"}></img>
            <div className="flex gap-x-10 text-lg font-light">
              <NavLinks />
            </div>
          </div>
          <div
            className={`flex-1 px-3 mr-0 ${
              !showSearchBar && "flex justify-end"
            }`}
          >
            {showSearchBar ? (
              <div
                className={`transition duration-500 ${
                  showSearchBar
                    ? " transform scale-100 flex-1 opacity-100 "
                    : "opacity-0 scale-0"
                }`}
              >
                <SearchBar customCssClasses={{ searchBarContainer: "mb-0" }} />
              </div>
            ) : (
              <BsSearch
                className="w-5 h-5"
                onClick={() => setShowSearchBar(true)}
              />
            )}
          </div>

          <CartIcon />
        </nav>
      </div>
    </>
  );
};

export default Header;
