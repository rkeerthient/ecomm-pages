// locator.tsx

import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import { provideHeadless } from "@yext/search-headless-react";
import searchConfig from "../components/searchConfig";
import SearchResults from "../components/SearchResults";
import LocationCard from "../components/Cards/LocationCard";

export const getPath: GetPath<TemplateProps> = () => {
  return `locations`;
};
export const config: TemplateConfig = {
  name: `locations`,
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Store Locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless({
  ...searchConfig,
  verticalKey: "locations",
});

const Locator: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    address,
    geomodifier,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    services,
    description,
  } = document;

  return (
    <PageLayout _site={_site}>
      <div className="centered-container">
        <SearchResults
          verticalKey="locations"
          inpClasses={"grid grid-cols-3 gap-6 max-w-screen-xl"}
          cardType={LocationCard}
          isLocationType={true}
        ></SearchResults>
      </div>
    </PageLayout>
  );
};

export default Locator;
