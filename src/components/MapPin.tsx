import * as React from "react";
import * as ReactDOM from "react-dom/server";
import { PinComponent } from "@yext/search-ui-react";
import { Popup, LngLatLike, Map } from "mapbox-gl";
import Location, { Coordinate } from "../types/locations";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { Result } from "@yext/search-headless-react";

const transformToMapboxCoord = (
  coordinate: Coordinate
): LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: Location) => {
  const address = location.address;
  const html = (
    <div className="p-2 text-primary-text-color ">
      <a className="font-medium  outline-none" href={location.landingPageUrl}>
        {location.name || "E-comm"}
      </a>
      <p>{`${address.city}, ${address.region}`}</p>
      <img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.foolcdn.com%2Fmedia%2Fdubs%2Fimages%2Fclothing_displayed_in_a_department_store_-_Gett.original.jpg&f=1&nofb=1"
        className="mt-4"
        alt=""
      />
    </div>
  );
  return ReactDOM.renderToString(html);
};

const MapPin: PinComponent<Location> = ({
  index,
  mapbox,
  result,
}: {
  index: number;
  mapbox: Map;
  result: Result<Location>;
}) => {
  const location = result.rawData;
  const [active, setActive] = useState(false);
  const popupRef = useRef(
    new Popup({ offset: 15, className: "px-2" }).on("close", () =>
      setActive(false)
    )
  );

  useEffect(() => {
    if (active && location.yextDisplayCoordinate) {
      const mapboxCoordinate = transformToMapboxCoord(
        location.yextDisplayCoordinate
      );
      if (mapboxCoordinate) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setHTML(getLocationHTML(location))
          .addTo(mapbox);
      }
    }
  }, [active, mapbox, location]);

  const handleClick = useCallback(() => {
    setActive(true);
  }, []);

  return (
    <button onClick={handleClick}>
      <IoLocationSharp className="!text-primary-text-color" size={30} />
    </button>
  );
};

export default MapPin;
