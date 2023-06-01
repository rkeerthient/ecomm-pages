import * as React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="absolute z-20 flex h-full w-full items-center justify-center bg-white opacity-70">
      <BiLoaderAlt className="animate-spin " size={64} />
    </div>
  );
};

export default Loader;
