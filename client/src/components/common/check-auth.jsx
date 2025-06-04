import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  const isLoginOrRegister = ["/auth/login", "/auth/register", "/auth/register-seller"].includes(path);

  // Jika user belum login dan akses halaman yang bukan publik
  if (!isAuthenticated && !isLoginOrRegister) {
    return <Navigate to="/auth/login" replace />;
  }

  // Jika user sudah login dan mencoba akses halaman login/register
  if (isAuthenticated && isLoginOrRegister) {
    if (user?.role === "seller") {
      return <Navigate to="/store/profile" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  // Jika user login, dan role tidak sesuai dengan path
  if (isAuthenticated) {
    const isSeller = user?.role === "seller";
    const isTryingToAccessSeller = path.includes("/seller") || path.includes("/store");
    const isTryingToAccessShop = path.includes("/shop");

    if (!isSeller && isTryingToAccessSeller) {
      return <Navigate to="/unauth-page" replace />;
    }

    if (isSeller && isTryingToAccessShop) {
      return <Navigate to="/store/dashboard" replace />;
    }
  }

  // Redirect dari root
  if (path === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" replace />;
    }
    return user?.role === "seller"
      ? <Navigate to="/store/profile  " replace />
      : <Navigate to="/shop/home" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;
