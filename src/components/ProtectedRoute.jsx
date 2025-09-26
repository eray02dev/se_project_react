import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // kullanıcı login değilse ana sayfaya yönlendir
    return <Navigate to="/" replace />;
  }
  // kullanıcı login ise çocuk bileşenleri göster
  return children;
}

export default ProtectedRoute;
