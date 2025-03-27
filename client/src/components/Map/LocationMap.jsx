import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { socket } from "../../socket";

// default marker icon  React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl:
    "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-1024.png",
  iconSize: [40, 40],

  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// Move map view to new location
function SetViewOnLocation({ coords }) {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, map.getZoom(), {
        animate: true,
        duration: 1.5,
      });
    }
  }, [coords, map]);

  return null;
}

const LocationMap = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const watchIdRef = useRef(null);

  // to get the current location
  const handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    const newPosition = { lat: latitude, lng: longitude };
    setPosition(newPosition);
    setError(null);

    //  Send location to server via Socket.io
    if (socket) {
      socket.emit("locationUpdate", newPosition);
    }
  };

  // to handle geolocation errors
  const handleError = (error) => {
    setError(`Error: ${error.message}`);
    setIsTracking(false);
  };

  // get current location
  const startTracking = () => {
    if ("geolocation" in navigator) {
      setIsTracking(true);

      // Get initial position
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
        enableHighAccuracy: true,
      });

      // continue tracking
      watchIdRef.current = navigator.geolocation.watchPosition(
        handleSuccess,
        handleError,
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  };

  // Stop tracking location
  const stopTracking = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setIsTracking(false);
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] rounded-lg shadow-lg overflow-hidden">
      {error && (
        <div className="absolute top-4 left-0 right-0 mx-auto w-max z-10 bg-red-500 text-white px-4 py-2 rounded-md shadow-md">
          {error}
        </div>
      )}

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={isTracking ? stopTracking : startTracking}
          className={`${
            isTracking
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-medium py-2 px-4 rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
          {isTracking ? "Stop Tracking" : "Start Tracking"}
        </button>

        {position && (
          <div className="bg-white bg-opacity-90 p-3 rounded-md shadow-md">
            <p className="text-sm font-medium">
              Lat: {position.lat.toFixed(6)}
            </p>
            <p className="text-sm font-medium">
              Lng: {position.lng.toFixed(6)}
            </p>
          </div>
        )}
      </div>

      <MapContainer
        center={position || [51.505, -0.09]} // Default center if no position
        zoom={17}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {position && (
          <Marker position={[position.lat, position.lng]} icon={customIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-medium">Current Location</p>
                <p className="text-sm">Lat: {position.lat.toFixed(6)}</p>
                <p className="text-sm">Lng: {position.lng.toFixed(6)}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {position && (
          <SetViewOnLocation coords={[position.lat, position.lng]} />
        )}
      </MapContainer>
    </div>
  );
};

export default LocationMap;
