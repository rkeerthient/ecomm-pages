import * as React from "react";

type Link = {
  label: string;
  url: string;
};
const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Products",
    url: "/products",
  },
  {
    label: "FAQs",
    url: "/faqs",
  },
  {
    label: "Locations",
    url: "/locations",
  },
];
const NavLinks = () => {
  return (
    <>
      {links.map((link) => (
        <div key={link.label}>
          <a
            href={link.url}
            className="hover:border-b-2 hover:border-button-price-color pb-2 text-sm font-bold"
            rel="noreferrer"
          >
            {link.label}
          </a>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
