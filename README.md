# 🏨 stayIn Hotel (Frontend)

A modern, responsive, and dynamic hotel management and booking system frontend built with **React** and **Vite**. This application provides a seamless user experience for guests to browse rooms, make bookings, and manage their profiles, while offering an administrative dashboard for managing rooms and reservations.

---

## ✨ Features

### For Guests:
- **Room Browsing & Searching**: Browse all available rooms or search for specific rooms based on check-in/check-out dates and room types.
- **Room Details & Amenities**: View detailed room information, pricing, and amenities (WiFi, Netflix, Breakfast, etc.).
- **Booking System**: Securely book rooms with adult/children guest counts and receive a unique booking confirmation code.
- **Manage Bookings**: Look up existing bookings using the confirmation code and cancel bookings if needed.
- **User Authentication**: Register for a new account, login securely via JWT, and manage user profile and booking history.

### For Administrators (Role-based Access):
- **Dashboard**: Centralized admin panel to manage the hotel's operations.
- **Room Management**: Add new rooms with image uploads, edit existing room details, and delete rooms.
- **Booking Management**: View all ongoing and past bookings, and cancel reservations if necessary.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [React 18](https://reactjs.org/) (powered by [Vite](https://vitejs.dev/) for fast builds and HMR)
- **Routing**: `react-router-dom` (Declarative routing)
- **Styling & UI**:
  - `bootstrap` & `react-bootstrap` (Grid system and UI components)
  - Custom CSS (`index.css`, `App.css`)
  - `react-icons` (Scalable vector icons)
- **HTTP Client**: `axios` (For making API requests to the backend)
- **State Management**: React Context API (`AuthContext` for global auth state)
- **Authentication**: `jwt-decode` (Decoding and extracting roles from JWT tokens)
- **Date & Time**: `moment` & `date-fns` (Date formatting and manipulation)
- **Components/Effects**: `react-slick` (Carousels), `react-spinners` (Loading states), `react-toastify` (Notifications)

---

## 🏗️ Project Architecture

```
stayIn-Hotel/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images and visual assets
│   ├── components/         # Reusable React components
│   │   ├── admin/          # Admin dashboard components
│   │   ├── auth/           # Login, Registration, Profile, AuthContext, RequireAuth
│   │   ├── bookings/       # Booking form, Checkout, Manage bookings, Find booking
│   │   ├── common/         # Carousels, Filters, Headers, Paginators, Parallax
│   │   ├── home/           # Main landing page
│   │   ├── layout/         # NavBar, MainHeader, Footer
│   │   ├── rooms/          # Add/Edit Room, Room Listing, Room Cards
│   │   └── utils/          # ApiFunction.js (Centralized Axios API calls)
│   ├── App.jsx             # Main application routing and wrapped context
│   ├── index.css           # Global custom styles
│   └── main.jsx            # Entry point
├── .env                    # Environment variables
└── vite.config.js          # Vite configuration
```

---

## 📡 API Integration (`ApiFunction.js`)

The application uses an `axios` instance configured to communicate with the Spring Boot backend via the base URL defined in the `.env` file (`VITE_APP_API_URL`).

### Key Endpoints Managed:
- **Rooms**: `GET /rooms/allrooms`, `GET /rooms/roomtypes`, `POST /rooms/addnewroom` (with `FormData` for multipart image upload), `PUT /rooms/update/{id}`, `DELETE /rooms/deleteroom/{id}`, `GET /rooms/available-rooms`
- **Bookings**: `GET /bookings/allbookings`, `POST /bookings/room/{roomId}/booking`, `GET /bookings/confirmation/{confirmationCode}`, `DELETE /bookings/booking/{id}/delete`
- **Auth & Users**: `POST /auth/login`, `POST /auth/register-user`, `GET /users/{id}`, `DELETE /users/delete/{id}`, `GET /bookings/user/{userId}/bookings`

### Security:
- JWT tokens are stored in `localStorage` upon successful login.
- The `getHeader()` utility attaches the `Bearer <token>` to protected API requests.
- The `<RequireAuth>` wrapper component protects restricted routes from unauthenticated access.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Clone & Install
```bash
git clone https://github.com/Kirankumar866/stayIn-Hotel.git
cd stayIn-Hotel
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory (if not already present) and configure your backend API URL:
```env
VITE_APP_API_URL=http://localhost:9999
```
*(Make sure this matches the port your Spring Boot backend is running on)*

### 3. Run Development Server
```bash
npm run dev
```
The application will be accessible at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
This generates an optimized static build in the `dist` directory.

---

## 🤝 Contribution & License
Feel free to fork the repository, open issues, and submit pull requests. This project is open for educational and professional showcase purposes.

**Author**: [Kiran Kumar](https://github.com/Kirankumar866)
