import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // Halaman publik tanpa perlu login
  const publicPaths = ["/auth/login", "/auth/register", "/auth/register-seller"];

  // ✅ Jika user belum login & mencoba akses halaman privat
  if (!isAuthenticated && !publicPaths.includes(path)) {
    return <Navigate to="/auth/login" replace />;
  }

  // ✅ Jika user sudah login tapi mencoba buka login/register lagi
  if (isAuthenticated && publicPaths.includes(path)) {
    return user?.role === "seller"
      ? <Navigate to="/store/profile" replace />
      : <Navigate to="/shop/home" replace />;
  }

  // ✅ Validasi role terhadap path
  if (isAuthenticated) {
    const isSeller = user?.role === "seller";

    const isAccessingSellerPage =
      path.startsWith("/store") || path.startsWith("/seller");

    const isAccessingCustomerShop = path.startsWith("/shop");

    // ❌ Customer mencoba buka dashboard seller
    if (!isSeller && isAccessingSellerPage) {
      return <Navigate to="/unauth-page" replace />;
    }

    // ❌ Seller mencoba buka halaman shop customer
    if (isSeller && isAccessingCustomerShop) {
      return <Navigate to="/store/profile" replace />;
    }
  }

  // ✅ Redirect dari root "/"
  if (path === "/") {
    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
    return user?.role === "seller"
      ? <Navigate to="/store/profile" replace />
      : <Navigate to="/shop/home" replace />;
  }

  // ✅ Jika semuanya valid, tampilkan konten
  return <>{children}</>;
}

export default CheckAuth;
