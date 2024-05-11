import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./elements/Loader";

export default function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.status);
  useEffect(() => {
    if (authentication && authStatus !== authentication) navigate("/login");
    else if (!authentication && authStatus !== authentication) navigate("/");
    setLoader(false);
  }, [loader, authStatus, navigate, authentication]);

  if (loader) return <Loader />;
  else {
    return <>{children}</>;
  }
}
