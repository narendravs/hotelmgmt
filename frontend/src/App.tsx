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

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
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
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/add-hotel"
          element={
            <Layout>
              <AddHotel />
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
          path="/hotel/:hotelId/bookings"
          element={
            <Layout>
              <Booking />
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
          path="/edit-hotel/:hotelId"
          // loader={loadData}
          element={
            <Layout>
              <EditHotel />
            </Layout>
          }
        />
        <Route
          path="/my-hotels"
          element={
            <Layout>
              <MyHotels />
            </Layout>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <Layout>
              <MyBookings />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
