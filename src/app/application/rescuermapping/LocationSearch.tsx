// LocationSearch.tsx
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { Controller } from "react-hook-form";
import { TileLayer, MapContainer, Marker, Polyline } from "react-leaflet";
import { icon, Icon } from "leaflet";
import { Input } from "@/components/ui/input";
import { Button } from "antd";
import { LatLngBoundsLiteral, LatLngTuple } from "leaflet";

const Route = ({ route }: { route: [number, number][] | null }) => {
  const map = useMap();

  useEffect(() => {
    if (route) {
      const bounds: LatLngBoundsLiteral = route.map(
        ([lat, lon]) => [lat, lon] as LatLngTuple
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, route]);

  return null;
};

const MapViewUpdater = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, 13);
    }
  }, [map, center]);

  return null;
};

export const LocationSearch = ({ control }: { control: any }) => {
  const [isSatellite, setIsSatellite] = useState(false); // Add this line
  const [startPosition, setStartPosition] = useState<[number, number] | null>(
    null
  );
  const [endPosition, setEndPosition] = useState<[number, number] | null>(null);
  const [route, setRoute] = useState<[number, number][] | null>(null);
  const [tracking, setTracking] = useState(false);
  const [shouldUpdateMapView, setShouldUpdateMapView] = useState(true);
  const [, setShouldFitBounds] = useState(true);
  const [mapCenter] = useState<[number, number] | null>(null);
  const [currentPosition, setCurrentPosition] = useState<
    [number, number] | null
  >(null);
  const [useDeviceLocation] = useState(true);

  const zoomToRoute = (position: [number, number]) => {
    setRoute([position]); // or any other logic you want to implement
  };

  useEffect(() => {
    let watchId: number | null = null;

    if (tracking && "geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPosition = [latitude, longitude] as [number, number];
          setStartPosition(currentPosition);
          zoomToRoute(currentPosition);
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [tracking]);

  let watchId: number | null = null;
  const startTracking = async () => {
    setTracking(true);
    setShouldUpdateMapView(false);

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const currentPosition = [latitude, longitude] as [number, number];
          setStartPosition(currentPosition);
          zoomToRoute(currentPosition);

          // Fetch and display a route from the user's current position to the destination
          if (endPosition) {
            const { coordinates } = await fetchRoute(
              currentPosition,
              endPosition
            );
            setRoute(coordinates);
            console.log(route);
            console.log(
              "startTracking",
              currentPosition,
              endPosition,
              coordinates
            );

            // Set shouldFitBounds to true when the start button is pressed
            setShouldFitBounds(true);
          }
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
        }
      );
    }
  };

  // const stopTracking = () => {
  //   if (watchId !== null) {
  //     navigator.geolocation.clearWatch(watchId);
  //     watchId = null;
  //   }
  // };

  const MapViewUpdater = ({
    center,
    shouldUpdate,
  }: {
    center: [number, number] | null;
    shouldUpdate: boolean;
  }) => {
    const map = useMap();

    useEffect(() => {
      if (center && shouldUpdate) {
        map.setView(center, map.getZoom());
      }
    }, [map, center, shouldUpdate]);

    return null;
  };

  const fromMarkerIcon: Icon = icon({
    iconUrl: "/Mapmarker-red.png",
    iconSize: [45, 48],
    iconAnchor: [13, 47],
    popupAnchor: [-3, -76],
  });
  const toMarkerIcon: Icon = icon({
    iconUrl: "/Mapmarker-green.png",
    iconSize: [65, 55],
    iconAnchor: [13, 47],
    popupAnchor: [-3, -76],
  });

  const fetchLocation = async (location: string) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${location}`
    );
    const searchResults = await response.json();
    if (searchResults && searchResults[0]) {
      const { lat, lon } = searchResults[0];
      return [parseFloat(lat), parseFloat(lon)] as [number, number];
    }
    return null;
  };

  const [instructions, setInstructions] = useState<string[]>([]);

  const fetchRoute = async (from: [number, number], to: [number, number]) => {
    console.log("Fetching route from:", from, "to:", to);
    try {
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62489d58851d849f4aaabf3b5400c49deaf2&start=${from[1]},${from[0]}&end=${to[1]},${to[0]}`
      );
      const data = await response.json();
      console.log("API response:", data);
      if (
        !data.features ||
        !data.features[0] ||
        !data.features[0].geometry ||
        !data.features[0].geometry.coordinates // Corrected this line
      ) {
        console.error(
          "Unexpected response format from OpenRouteService API:",
          data
        );
        return { coordinates: [], instructions: [] };
      }
      const coordinates: [number, number][] =
        data.features[0].geometry.coordinates.map(
          ([lon, lat]: [number, number]) => [lat, lon]
        );
      const instructions: string[] =
        data.features[0].properties.segments[0].steps.map(
          (step: any) => step.instruction
        );
      return { coordinates, instructions };
    } catch (error) {
      console.error("Error fetching route from OpenRouteService API:", error);
      return { coordinates: [], instructions: [] };
    }
  };

  // New component
  const Route = ({
    route,
    shouldFitBounds,
  }: {
    route: [number, number][] | null;
    shouldFitBounds: boolean;
  }) => {
    const map = useMap();

    useEffect(() => {
      console.log("Route", route, shouldFitBounds);
      if (route && route.length > 0 && shouldFitBounds) {
        const latitudes = route.map(([lat, _]) => lat);
        const longitudes = route.map(([_, lon]) => lon);
        const bounds: LatLngBoundsLiteral = [
          [Math.min(...latitudes), Math.min(...longitudes)],
          [Math.max(...latitudes), Math.max(...longitudes)],
        ];
        map.fitBounds(bounds);
      }
    }, [route, map, shouldFitBounds]);

    return route ? <Polyline positions={route} color="red" /> : null;
  };

  useEffect(() => {
    if (navigator.geolocation && useDeviceLocation) {
      navigator.geolocation.watchPosition((position) => {
        setCurrentPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    }
  }, [useDeviceLocation]);

  useEffect(() => {
    if (currentPosition && endPosition) {
      fetchRoute(currentPosition, endPosition).then((routeData) => {
        if (routeData) {
          setRoute(routeData.coordinates);
          setInstructions(routeData.instructions);
        }
      });
    }
  }, [currentPosition, endPosition]);

  return (
    <>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-0 md:gap-3">
        <Controller
          name="end_location"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              placeholder="Enter End Location"
              defaultValue={field.value || ""}
              onChange={async (e) => {
                field.onChange(e.target.value);
                const newPosition = await fetchLocation(e.target.value);
                setEndPosition(newPosition);
              }}
            />
          )}
        />
        <Controller
          name="end_coordinates"
          control={control}
          render={({ field }) => (
            <div>
              <Input
                {...field}
                type="text"
                placeholder="End Coordinates"
                value={endPosition ? endPosition.join(", ") : ""}
                readOnly
              />
            </div>
          )}
        />
      </div>
      <div className="grid grid-cols-3 gap-1 md:grid-cols-0 md:gap-3">
        <button
          type="button"
          className="w-[100%] rounded-md h-[40px] bg-emerald-600 transform active:scale-95 transition-transform text-xs text-white font-bold text-center cursor-pointer"
          onClick={() => setIsSatellite(!isSatellite)}
        >
          Toggle Satellite
        </button>
        <button
          type="button"
          className="w-[100%] rounded-md h-[40px] bg-emerald-600 transform active:scale-95 transition-transform text-xs text-white font-bold text-center cursor-pointer"
          onClick={() =>
            navigator.clipboard.writeText(
              endPosition ? endPosition.join(", ") : ""
            )
          }
        >
          Copy Coordinates
        </button>
        <Button
          className="w-[100%] rounded-md h-[40px] bg-emerald-600 transform active:scale-95 transition-transform text-xs text-white font-bold text-center cursor-pointer"
          onClick={startTracking}
        >
          START
        </Button>
        {/* <button
          onClick={stopTracking}
          className="items-center whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 text-xs font-bold rounded-lg min-w-[50px] flex justify-center place-items-center gap-2 bg-primary/90 hover:bg-primary primary-glow transition-all duration-300"
        >
          Stop Tracking
        </button> */}
      </div>
      <div
        className="mt-10 flex justify-center items-center rounded-lg w-64 h-64 overflow-hidden" // Add overflow-hidden
      >
        <MapContainer
          center={mapCenter || [9.4401, 123.187]}
          zoom={13}
          className="w-full h-full" // Use Tailwind CSS utilities for width and height
        >
          {isSatellite ? (
            <>
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}" />
            </>
          ) : (
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          )}
          {startPosition && (
            <Marker position={startPosition} icon={fromMarkerIcon} />
          )}
          {endPosition && <Marker position={endPosition} icon={toMarkerIcon} />}
          {route && <Route route={route} shouldFitBounds={true} />}
          <MapViewUpdater
            center={startPosition}
            shouldUpdate={shouldUpdateMapView}
          />
        </MapContainer>
      </div>
    </>
  );
};
export default LocationSearch;
