import * as React from "react";
import NavLinks from "./NavLinks";
import { SearchBar } from "@yext/search-ui-react";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import Ce_site from "../types/site";
import CartIcon from "./Cart/CartIcon";

const Header = ({ _site }: any) => {
  const { logo, c_logo_white, c_logo_dark }: Ce_site = _site;

  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <>
      <div className="centered-container mb-8">
        <nav className="flex items-center justify-between py-6">
          <div className="flex gap-2 items-center w-1/3">
            <div className="w-full flex gap-2 text-lg flex-row justify-between font-light dark:text-text-light-secondary dark:font-normal">
              <NavLinks />
            </div>
          </div>
          <div className="w-auto h-10  ">
            <img
              src="https://i.imgur.com/02SpJmw.png"
              className="object-cover w-full h-full"
              alt="Image"
            />
          </div>
          <div
            className={`w-1/3 gap-x-4  px-3 mr-0 ${
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
                className="w-5 h-5 dark:text-text-light-primary"
                onClick={() => setShowSearchBar(true)}
              />
            )}
            <CartIcon />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
{
  /* <img
              src={c_logo_white?.url}
              className="dark:hidden"
              style={{ height: "200px", width: "130px" }}
            ></img>
            <img
              src="https://i.imgur.com/FLnFZAU.png"
              style={{ height: "130px", width: "130px" }}
            ></img> 
              <DarkModeToggle />;
            
            */
  
}
