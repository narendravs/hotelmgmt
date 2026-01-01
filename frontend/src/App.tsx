import Home from "./pages/Home.tsx";
import {
  Routes,
  Navigate,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Layout from "./layouts/Layout";
import AddHotel from "./pages/AddHotel.tsx";
import Detail from "./pages/Details.tsx";
import Booking from "./pages/Booking.tsx";
import Search from "./pages/Search.tsx";
import EditHotel from "./pages/EditHotel.tsx";
import MyHotels from "./pages/MyHotels.tsx";
import MyBookings from "./pages/MyBookings.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- PUBLIC ROUTES (Anyone can see) --- */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/details/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />

        {/* --- PROTECTED ROUTES (Only if logged in) --- */}

        <Route
          path="/add-hotel"
          element={
            <ProtectedRoute>
              <Layout>
                <AddHotel />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-hotel/:hotelId"
          element={
            <ProtectedRoute>
              <Layout>
                <EditHotel />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-hotels"
          element={
            <ProtectedRoute>
              <Layout>
                <MyHotels />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <Layout>
                <MyBookings />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/hotel/:hotelId/bookings"
          element={
            <ProtectedRoute>
              <Layout>
                <Booking />
              </Layout>
            </ProtectedRoute>
          }
        />
        {/* Default redirect for 404s */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
