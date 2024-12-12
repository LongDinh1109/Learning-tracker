import React from "react";
import { Navigate } from "react-router-dom";
import { useAppselector } from "@/hooks/hook";

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
  const { token } = useAppselector((state) => state.auth);
  
  if (!token || !isTokenValid(token)) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
