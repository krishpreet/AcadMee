import React, { useEffect } from "react";
import "./App.css";
import WebFont from "webfontloader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./component/Product/Products";
import Home from "./component/Home/Home";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ProductDetails from "./component/Product/ProductDetails";
import BookingCalendar from "./component/Product/BookingCalendar";
import Profile from "./component/User/Profile";
import MyOrders from "./component/Order/MyOrders";
import store from "./store";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import { loadUser } from "./actions/userAction";
import CalendarBookingSystem from "./component/Home/CalendarBookingSystem";
import LoginSignUp from "./component/User/LoginSignUp";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:keyword"
          element={
            <>
              <Products />
            </>
          }
        />
        <Route path="/login-signup" element={<LoginSignUp/>} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cali" element={<CalendarBookingSystem />} />
        <Route path="/account" element={<Profile />} />
        <Route path="/me/update" element={<UpdateProfile />} />
        <Route path="/password/update" element={<UpdatePassword />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/calendar" element={<BookingCalendar />} />

      </Routes>
    </Router>
  );
}

export default App;
