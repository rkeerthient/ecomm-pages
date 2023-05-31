import * as React from "react";
import Header from "./header";
import Footer from "./footer";

export interface PageLayoutProps {
  children?: React.ReactNode;
  _site?: any;
}

const PageLayout = ({ children, _site }: PageLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      {children}
      <Footer _site={_site} />
    </div>
  );
};

export default PageLayout;
