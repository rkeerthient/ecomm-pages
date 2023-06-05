import * as React from "react";
import {
  MapboxMap,
  VerticalResults,
  getUserLocation,
  OnDragHandler,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import "mapbox-gl/dist/mapbox-gl.css";
import { LngLat, LngLatBounds } from "mapbox-gl";
import LocationCard from "../components/Cards/LocationCard";
import Loader from "../components/Loader";
import MapPin from "../components/MapPin";

type InitialSearchState = "not started" | "started" | "complete";

const LocationsPage = () => {
  const resultCount = useSearchState(
    (state) => state.vertical.resultsCount || 0
  );
  const [showSearchAreaButton, setShowSearchAreaButton] = React.useState(false);
  const [mapCenter, setMapCenter] = React.useState<LngLat | undefined>();
  const [mapBounds, setMapBounds] = React.useState<LngLatBounds | undefined>();

  const handleDrag: OnDragHandler = (center: LngLat, bounds: LngLatBounds) => {
    setMapCenter(center);
    setMapBounds(bounds);
    setShowSearchAreaButton(true);
  };

  const handleSearchAreaClick = () => {
    if (mapCenter && mapBounds) {
      const locationFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Current map area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          value: {
            lat: mapCenter.lat,
            lng: mapCenter.lng,
            radius: mapBounds.getNorthEast().distanceTo(mapCenter),
          },
          matcher: Matcher.Near,
        },
      };
      searchActions.setStaticFilters([locationFilter]);
      searchActions.executeVerticalQuery();
      setShowSearchAreaButton(false);
    }
  };

  const searchActions = useSearchActions();

  const [initialSearchState, setInitialSearchState] =
    React.useState<InitialSearchState>("not started");

  React.useEffect(() => {
    getUserLocation()
      .then((location) => {
        searchActions.setStaticFilters([
          {
            selected: true,
            displayName: "Current Location",
            filter: {
              kind: "fieldValue",
              fieldId: "builtin.location",
              value: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
                radius: 40233.6,
              },
              matcher: Matcher.Near,
            },
          },
        ]);
      })
      .catch(() => {
        searchActions.executeVerticalQuery();
      })
      .then(() => {
        searchActions
          .executeVerticalQuery()
          .then(() => setInitialSearchState("complete"));
      });
  }, []);

  return (
    <>
      <div className="relative flex h-[calc(100vh-210px)]">
        {initialSearchState !== "complete" && <Loader />}
        <div className="flex w-1/3 flex-col pt-6 pr-6">
          {resultCount > 0 && (
            <VerticalResults
              customCssClasses={{ verticalResultsContainer: "overflow-y-auto" }}
              CardComponent={LocationCard}
            />
          )}
          {resultCount === 0 && initialSearchState === "complete" && (
            <div className="flex items-center justify-center">
              <p className="pt-4 text-2xl">No results found for this area</p>
            </div>
          )}
        </div>
        <div className="relative w-2/3">
          <MapboxMap
            mapboxAccessToken="pk.eyJ1IjoicGZhcmthcyIsImEiOiJjbGducW80d2EwaWJyM2R0YWJlYnFremdwIn0.1j7wr-0XhQ5go1CVcUtXbQ"
            PinComponent={MapPin}
            onDrag={handleDrag}
          />
          {showSearchAreaButton && (
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <button
                onClick={handleSearchAreaClick}
                className="rounded-2xl border bg-white py-2 px-4 shadow-xl"
              >
                <p>Search This Area</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LocationsPage;
