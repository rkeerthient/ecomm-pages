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
import ProductsPage from "../Pages/ProductsPage";

export const config: TemplateConfig = {
  name: "products",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `products`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Ecomm | Products",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const ProductsWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <ProductsPage></ProductsPage>
        </div>
      </PageLayout>
    </>
  );
};

export default ProductsWrapper;
