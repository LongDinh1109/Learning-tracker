import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type AuthRouteProps = {
  children: React.ReactNode;
};

const isTokenValid = (token: string) => {
  if (!token) return false;

  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  const expirationTime = decodedToken.exp;
  const currentTime = Date.now() / 1000;

  return expirationTime > currentTime;
};

export default function AuthRoute({ children }: AuthRouteProps) {
  const { token } = useAuth();
  
  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
