import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // 👉 Public routes yang boleh diakses tanpa login
  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/register-seller",
    "/shop/home",
    "/shop/listing",
    "/shop/search",
  ];

  const isPublicPath =
    publicPaths.includes(path) ||
    path.startsWith("/shop/store");

  // 🔐 1. Redirect jika belum login dan bukan halaman publik
  if (!isAuthenticated && !isPublicPath) {
    return <Navigate to="/auth/login" replace />;
  }

  // 🔄 2. Redirect jika sudah login tapi akses halaman login/register
  if (isAuthenticated && publicPaths.includes(path)) {
    // ✅ Izinkan customer daftar jadi seller
    if (path === "/auth/register-seller" && user?.role === "customer") {
      return <>{children}</>;
    }

    // 🔁 Redirect berdasarkan role
    if (user?.role === "seller") return <Navigate to="/store/profile" replace />;
    if (user?.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/shop/home" replace />;
  }

  // 🛡️ 3. Cek role akses halaman
  if (isAuthenticated) {
    const role = user?.role;
    const isSellerPage = path.startsWith("/store");
    const isCustomerPage = path.startsWith("/shop");
    const isAdminPage = path.startsWith("/admin");

    if (role !== "seller" && isSellerPage) return <Navigate to="/unauth-page" replace />;
    if (role !== "customer" && !isPublicPath && isCustomerPage) return <Navigate to="/unauth-page" replace />;
    if (role !== "admin" && isAdminPage) return <Navigate to="/unauth-page" replace />;
  }

  // 🌐 4. Redirect dari root "/"
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/shop/home" replace />;
    if (user?.role === "seller") return <Navigate to="/store/profile" replace />;
    if (user?.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/shop/home" replace />;
  }

  // ✅ Jika aman, render konten
  return <>{children}</>;
}

export default CheckAuth;
