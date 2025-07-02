import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  const publicPaths = ["/auth/login", "/auth/register", "/auth/register-seller"];

  // ✅ Jika user belum login & mencoba akses halaman privat
  if (!isAuthenticated && !publicPaths.includes(path)) {
    return <Navigate to="/auth/login" replace />;
  }

  // ✅ Jika user sudah login tapi mencoba buka login/register lagi
  if (isAuthenticated && publicPaths.includes(path)) {
    // Jika customer ingin akses register seller → izinkan
    if (path === "/auth/register-seller" && user?.role === "customer") {
      return <>{children}</>;
    }
  
    if (user?.role === "seller") return <Navigate to="/store/profile" replace />;
    if (user?.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/shop/home" replace />;
  }
  

  if (isAuthenticated) {
    const role = user?.role;
    const isSeller = role === "seller";
    const isAdmin = role === "admin";
    const isCustomer = role === "customer";

    const isAccessingSellerPage = path.startsWith("/store");
    const isAccessingCustomerShop = path.startsWith("/shop");
    const isAccessingAdminPage = path.startsWith("/admin");

    // ❌ Customer atau Admin mencoba buka dashboard seller
    if (!isSeller && isAccessingSellerPage) {
      return <Navigate to="/unauth-page" replace />;
    }

    // ❌ Seller atau Admin mencoba buka halaman customer (/shop)
    if (!isCustomer && isAccessingCustomerShop) {
      return <Navigate to="/unauth-page" replace />;
    }

    // ❌ Seller atau Customer mencoba buka dashboard admin
    if (!isAdmin && isAccessingAdminPage) {
      return <Navigate to="/unauth-page" replace />;
    }
  }

  // ✅ Redirect dari root "/"
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
    if (user?.role === "seller") return <Navigate to="/store/profile" replace />;
    if (user?.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/shop/home" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;
