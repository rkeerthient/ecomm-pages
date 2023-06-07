import * as React from "react";
import { AiOutlineRight } from "react-icons/ai";
const Footer = ({ _site }: any) => {
  return (
    <footer className="border bg-[#FBFBFB]">
      <div className="centered-container  py-8">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col space-y-6 text-base">
            <p className="font-bold">Company info</p>
            <div className="flex space-y-1 flex-col">
              <div>About Us</div>
              <div>Latest Posts</div>
              <div>Contact Us</div>
              <div>Shop</div>
            </div>
          </div>
          <div className="flex flex-col space-y-6 text-base">
            <p className="font-bold">Company info</p>
            <div className="flex space-y-1 flex-col">
              <div>Tracking</div>
              <div>Order Status</div>
              <div>Delivery</div>
              <div>Shipping Info</div>
              <div>FAQ</div>
            </div>
          </div>
          <div className="flex flex-col space-y-6 text-base">
            <p className="font-bold">useful links</p>
            <div className="flex space-y-1 flex-col">
              <div>Special Offers</div>
              <div>Gift Cards</div>
              <div>Advetising</div>
              <div>Terms of Use</div>
            </div>
          </div>
          <div className="flex flex-col space-y-6 text-base">
            <p className="font-bold">get in the know</p>
            <div className="flex space-y-1 flex-col">
              <div className="pb-3 items-center flex gap-2 ">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="border-b border-[#1D1D1D] pb-2"
                />
                <AiOutlineRight />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-36 pt-4 border-t border-[#E8E8E8]">
          <div className="flex justify-between text-sm text-heading">
            <div className="flex flex-col gap-2">
              <div>© 2020 NorthStar eCommerce</div>
              <div className="flex flex-row gap-4">
                <div>Privacy Policy</div>
                <div>Terms & Conditions</div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
