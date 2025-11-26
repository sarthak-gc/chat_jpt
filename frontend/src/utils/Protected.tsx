import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "./axios";
interface Props {
  children: React.ReactNode;
}

export const ProtectedRoutes = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("user/me");
        setIsAuthenticated(res.data.valid);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [children]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
