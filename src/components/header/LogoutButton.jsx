import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth_service";
import { logout } from "../../store/authSlice";

function LogoutButton() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .finally(alert("Logout successful"));
  };

  return (
    <div>
      <button
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
      >
        Log out
      </button>
    </div>
  );
}

export default LogoutButton;
