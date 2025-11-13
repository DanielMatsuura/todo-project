import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  children: JSX.Element;
}

/**
 * Wraps around routes that require authentication.
 * If the user is authenticated, renders the child component(s).
 * If the authentication state is loading, shows a loading spinner.
 * If the user is not authenticated, redirects to the login page.
 */
const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
