# Location Tracker Project

This project consists of a real-time location tracking application with a **React.js** and **tailwind CSS** frontend and a **Node.js/Express** backend using **Socket.io** for live updates.

## Features

- Real-time location tracking
- Interactive map using **React-Leaflet**
- WebSocket communication with **Socket.io**
- Responsive UI with **Tailwind CSS**
- Geolocation API support

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **MongoDB** (if database is required for future enhancements)

---

## Project Setup

### 1. Clone the Repository

```sh
git clone
cd location-tracker
```

---

## Backend Setup

### 2. Navigate to the Server Directory

```sh
cd server
```

### 3. Install Dependencies

```sh
npm install
```

### 4. Start the Backend Server

```sh
npm start
```

The backend will run on **http://localhost:5000**.

---

## Frontend Setup

### 5. Navigate to the Client Directory

```sh
cd ../client
```

### 6. Install Dependencies

```sh
npm install
```

### 7. Start the Frontend

```sh
npm start
```

The frontend will run on **http://localhost:5173**.

---

## Configuration

- The backend uses **Socket.io** for real-time location updates.
- Ensure the frontend connects to the correct backend WebSocket endpoint (`http://localhost:3000`).
- Environment variables can be set in a `.env` file in the server directory (if required).

---

## Folder Structure

```
location-tracker/
│-- client/          # React frontend
│-- server/          # Node.js backend
│-- README.md        # Documentation
```

---

## Deployment

For production deployment:

- Use **PM2** for backend process management.
- Host frontend on **Vercel** or **Netlify**.
- Host backend on **Heroku**, **Render**, or **AWS**.

---

## Contributing

Feel free to submit issues or pull requests to improve the project.

---

## License

This project is licensed under the **MIT License**.
