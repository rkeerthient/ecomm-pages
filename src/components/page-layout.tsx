import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";
import Ce_site from "../types/types/site";

export interface PageLayoutProps {
  children?: React.ReactNode;
  _site?: Ce_site;
}
const searcher = provideHeadless({ ...searchConfig });
const PageLayout = ({ children, _site }: PageLayoutProps) => {
  console.log(JSON.stringify(_site));

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <div className="min-h-screen">
        <Header _site={_site} />
        {children}
        <Footer _site={_site} />
      </div>
    </SearchHeadlessProvider>
  );
};

export default PageLayout;
