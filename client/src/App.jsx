// src/App.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LocationMap from "./components/Map/LocationMap";
import Footer from "./components/Footer";
import { socket, connectSocket } from "./socket";

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // Connect to socket server
    connectSocket();

    // Set up event listeners
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Clean up on unmount
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Real-Time Location Tracker
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Track your movements in real-time with our precise location
              tracker
            </p>
            {!isConnected && (
              <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Disconnected from server. Reconnecting...</span>
              </div>
            )}
          </header>

          <section className="mb-12">
            <LocationMap />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-blue-500 mb-4">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  High Precision
                </h3>
                <p className="text-gray-600">
                  Track your location with high accuracy using modern
                  geolocation technologies and real-time updates.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-blue-500 mb-4">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Real-Time Updates
                </h3>
                <p className="text-gray-600">
                  Experience seamless tracking with instant updates powered by
                  WebSocket technology.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-blue-500 mb-4">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Secure Tracking
                </h3>
                <p className="text-gray-600">
                  Your location data is transmitted securely and is only
                  accessible by you.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
