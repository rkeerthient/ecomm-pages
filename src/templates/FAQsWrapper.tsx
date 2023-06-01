/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import SearchResults from "../components/SearchResults";
import FAQCard from "../components/Cards/FAQCard";

export const config: TemplateConfig = {
  name: "faqs",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `faqs`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Ecomm | FAQs",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const FAQsWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <SearchResults
            verticalKey="faqs"
            inpClasses={"max-w-screen-xl"}
            cardType={FAQCard}
          ></SearchResults>
        </div>
      </PageLayout>
    </>
  );
};

export default FAQsWrapper;
