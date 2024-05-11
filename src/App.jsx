import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth_service";
import { login, logout } from "./store/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import Loader from "./components/elements/Loader";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((data) => {
        data ? dispatch(login(data)) : dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loading]);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
