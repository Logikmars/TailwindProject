import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
  const isAuth = useSelector((state) => state.user.isAuth);

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
