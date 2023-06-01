/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/page-layout";
import "../index.css";
import { useState } from "react";
import { BsCheck, BsFillBagCheckFill } from "react-icons/bs";
import Cart from "../components/Cart";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-2",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "uid",
      "meta",
      "slug",
      "id",
      "landingPageUrl",
      "primaryPhoto",
      "name",
      "c_cCategory",
      "c_color",
      "c_department",
      "c_fabric",
      "c_fit",
      "c_price",
      "c_productCategory",
      "c_size",
      "c_sleeveLength",
      "c_subtitle",
      "c_type",
      "c_productDescription",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["product"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : document.id.toString();
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({ document }) => {
  const {
    _site,
    primaryPhoto,
    name,
    c_cCategory,
    c_color,
    c_department,
    c_price,
    c_productCategory,
    c_productDescription,
  } = document;
  const [amount, setAmount] = useState(1);

  const increase = () => {
    setAmount((oldAmount) => {
      var amnt = oldAmount + 1;
      if (amnt >= 20) setAmount(20);
      else setAmount(amnt);
      return amnt;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      var amnt = oldAmount - 1;
      if (amnt < 1) setAmount(1);
      else setAmount(amnt);
      return amnt;
    });
  };

  return (
    <>
      <PageLayout _site={_site}>
        <div className="prodDesc text-gray-600 text-base flex flex-row gap-16 mx-auto justify-center items-center">
          <div className="w-1/2 flex justify-end">
            <img
              src={primaryPhoto.image.url}
              className="object-cover rounded-md w-full"
              style={{ height: "500px" }}
            />
          </div>
          <div className="py-20 w-1/2 leading-6">
            <h2 className="text-4xl font-light text-black mb-3">{name}</h2>
            <h5 className="text-xl text-button-price-color mb-3">{c_price}</h5>
            <p className="leading-8  mb-5">{c_productDescription}</p>
            {c_department && (
              <p className="capitalize grid grid-cols-2 w-2/4 mb-5 ">
                <span className="font-bold">For : </span> {c_department}
              </p>
            )}
            {c_productCategory && (
              <p className="capitalize grid grid-cols-2 w-2/4 mb-5 ">
                <span className="font-bold">Type : </span>
                {c_productCategory}
              </p>
            )}
            {c_cCategory && (
              <p className="capitalize grid grid-cols-2 w-2/4 mb-5 ">
                <span className="font-bold">Category : </span>
                {c_cCategory}
              </p>
            )}
            <hr className="my-4" />
            {c_color && (
              <div>
                <div className="capitalize grid grid-cols-2 w-2/4 mb-5 ">
                  <span className="capitalize font-bold">colors :</span>
                  <div className="flex">
                    {c_color.map((color: any, index: any) => {
                      return (
                        <span key={index}>
                          <button
                            className="w-6 h-6 rounded-full mr-2 border-none cursor-pointer opacity-50 flex items-center justify-center"
                            style={{ background: color }}
                          >
                            <BsCheck className=" text-white text-lg" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Cart
                    increase={increase}
                    decrease={decrease}
                    amount={amount}
                  />
                  <a
                    href="/cart"
                    className="w-fit text-sm px-4 py-2 bg-button-price-color hover:text-hover-text-color hover:bg-hover-button-color text-white font-light uppercase rounded-md transition-all duration-300 ease-linear"
                    // onClick={() => {
                    //   addToCart(id, data.c_color[0], amount, data);
                    // }}
                  >
                    add to cart
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
