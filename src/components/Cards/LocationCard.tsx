import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Location, { Coordinate } from "../../types/locations";
import { RiDirectionFill } from "react-icons/ri";
import HoursText from "../HoursText";
const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};
const LocationCard: CardComponent<Location> = ({
  result,
}: CardProps<Location>): JSX.Element => {
  const location = result.rawData;
  const { name } = location;

  const getGoogleMapsLink = (coordinate: Coordinate): string => {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinate.latitude},${coordinate.longitude}`;
  };

  return (
    <div className="flex justify-between border-y p-4">
      <div className="flex">
        <div className="space-y-2">
          <a
            target={"_self"}
            href={location.slug}
            className="font-semibold text-brand-primary"
            rel="noreferrer"
          >
            {location.geomodifier}
          </a>
          <p className="text-xl text-primary-text-color">{name}</p>
          {location.hours && (
            <p>
              <HoursText document={location}></HoursText>
            </p>
          )}
          <div>
            <p className="text-sm">{location.address.line1}</p>
            <p className="text-sm">{`${location.address.city}, ${location.address.region} ${location.address.postalCode}`}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col space-y-2 my-auto">
        <div className="text-sm text-gray-500">
          {metersToMiles(result.distance!)}mi
        </div>
        {location.yextDisplayCoordinate && (
          <a
            target={"_blank"}
            className="flex border px-2 py-1 flex-row gap-2 items-center text-sm text-brand-cta"
            href={getGoogleMapsLink(location.yextDisplayCoordinate)}
            rel="noreferrer"
          >
            <RiDirectionFill size={24} className="text-primary-text-color" />
            <p>Directions</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
