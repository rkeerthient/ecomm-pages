/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import { fetch } from "@yext/pages/util";
import "../index.css";
import {
  Template,
  GetPath,
  TransformProps,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import Card from "../components/card";
import { ExternalImage } from "../types/ExternalImage";
import img from "../TempFolder/img_1.png";
import img1 from "../TempFolder/1.png";
import { FaShippingFast } from "react-icons/fa";
/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "index",
};

/**
 * A local type for transformProps. This could live in src/types but it's generally
 * best practice to keep unshared types local to their usage.
 */
type ExternalImageData = TemplateProps & { externalImage: ExternalImage };

/**
 * Used to either alter or augment the props passed into the template at render time.
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 *
 * This can be used when data needs to be retrieved from an external (non-Knowledge Graph)
 * source. This example calls a public API and returns the data.
 *
 * If the page is truly static this function is not necessary.
 */
export const transformProps: TransformProps<ExternalImageData> = async (
  data
) => {
  const url = import.meta.env.YEXT_PUBLIC_EXTERNAL_IMAGE_API_BASE_URL + "/2";
  const externalImage = (await fetch(url).then((res: any) =>
    res.json()
  )) as ExternalImage;
  return { ...data, externalImage };
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<ExternalImageData> = () => {
  return `index.html`;
};

type ExternalImageRenderData = TemplateRenderProps & {
  externalImage: ExternalImage;
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Static: Template<ExternalImageRenderData> = ({
  relativePrefixToRoot,
  path,
  document,
  externalImage,
}) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <div className="space-y-5 my-8">
            <img src={img} alt="" />
            <div className="gap-y-14 justify-center flex flex-col text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold text-heading">
                  Discover NEW Arrivals
                </h1>
                <p className="text-xl text-text">Recently added shirts!</p>
              </div>
              {/* New Arrivals Grid */}
              <div className="grid grid-cols-4 gap-x-12 gap-y-5 space-y-0">
                {Array.from({ length: 8 }, (_, index) => (
                  <div className="flex flex-col space-y-2" key={index}>
                    <img src={img1} alt="" />
                    <div className=" text-base">
                      <p className="text-heading font-medium">
                        Plain White Shirt
                      </p>
                      <p className="text-text">$29</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Shippig grid */}
              <div className="grid grid-cols-4 gap-x-12 gap-y-5 space-y-0 text-base">
                {Array.from({ length: 4 }, (_, index) => (
                  <div className="flex flex-row gap-4" key={index}>
                    <FaShippingFast size={25} className="text-xl" />
                    <div className="flex flex-col text-left">
                      <div className="font-bold  text-primary">
                        Free Shipping
                      </div>
                      <div className="text-text">
                        Enjoy free shipping on all orders above $100
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Banners */}
              <div className="flex flex-row gap-6 w-full text-white">
                <div className="border w-3/5 bg-black p-20">
                  <div className="flex flex-col gap-y-6 justify-center">
                    <div className="text-4xl uppercase">peace of mind</div>
                    <div className="text-lg w-3/4 mx-auto">
                      A one-stop platform for all your fashion needs,
                      hassle-free. Buy with a peace of mind.
                    </div>
                    <div className="uppercase text-sm py-4 px-9 bg-white text-black w-fit mx-auto shadow-lg">
                      buy now
                    </div>
                  </div>
                </div>
                <div className="border w-2/5 bg-black p-20">
                  <div className="flex flex-col gap-y-6 justify-center">
                    <div className="text-4xl uppercase">Buy 2 Get 1 Free</div>
                    <div className="text-lg mx-auto">
                      End of season sale. Buy any 2 items of your choice and get
                      1 free.
                    </div>
                    <div className="uppercase text-sm py-4 px-9 bg-white text-black w-fit mx-auto shadow-lg">
                      buy now
                    </div>
                  </div>
                </div>
              </div>
              {/* Top Sellers */}
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-heading">Top Sellers</h1>
                <p className="text-xl text-text">
                  Browse our top-selling products
                </p>
              </div>
              {/* Product Grid */}
              <div className="grid grid-cols-4 gap-x-12 gap-y-5 space-y-0">
                {Array.from({ length: 4 }, (_, index) => (
                  <div className="flex flex-col space-y-2" key={index}>
                    <img src={img1} alt="" />
                    <div className=" text-base">
                      <p className="text-heading font-medium">
                        Plain White Shirt
                      </p>
                      <p className="text-text">$29</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Shop now button */}
              <div className="text-base py-4 px-9 bg-[#024E82] text-white font-normal uppercase w-fit mx-auto">
                shop now
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Static;
