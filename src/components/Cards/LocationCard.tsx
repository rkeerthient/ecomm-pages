import { CardComponent, CardProps } from "@yext/search-ui-react";
import * as React from "react";
import Location, { Coordinate } from "../../types/locations";
import { RiDirectionFill } from "react-icons/ri";
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
        <div>
          <a
            target={"_self"}
            href={location.slug}
            className="font-semibold text-brand-primary"
            rel="noreferrer"
          >
            {location.geomodifier}
          </a>
          <p className="text-xl">{name}</p>
          <p className="text-sm">{location.address.line1}</p>
          <p className="text-sm">{`${location.address.city}, ${location.address.region} ${location.address.postalCode}`}</p>
        </div>
      </div>
      <div className="flex items-center flex-col justify-evenly">
        <div className="text-sm text-gray-500">
          {metersToMiles(result.distance!)}mi
        </div>
        {location.yextDisplayCoordinate && (
          <a
            target={"_blank"}
            className="flex flex-row gap-2 items-center text-sm text-brand-cta"
            href={getGoogleMapsLink(location.yextDisplayCoordinate)}
            rel="noreferrer"
          >
            <RiDirectionFill size={24} />
            <p>Directions</p>
          </a>
        )}
      </div>
    </div>
  );
};

export default LocationCard;
