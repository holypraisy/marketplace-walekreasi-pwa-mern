import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, requiredRole, children }) {
  const location = useLocation();
  const { pathname } = location;

  // ✅ Daftar path yang boleh diakses tanpa login
  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/register-seller",
    "/shop/home",
    "/shop/listing",
    "/shop/search",
  ];

  // ✅ Cek apakah halaman ini public
  const isPublicPage =
    publicPaths.includes(pathname) || pathname.startsWith("/shop/store");

  // 1️⃣ Jika belum login dan bukan halaman publik → arahkan ke login
  if (!isAuthenticated && !isPublicPage) {
    return (
      <Navigate to="/auth/login" replace state={{ from: location }} />
    );
  }

  // 2️⃣ Jika sudah login tapi akses halaman public/auth (kecuali /register-seller untuk customer)
  if (isAuthenticated && isPublicPage) {
    const isRegisterSeller = pathname === "/auth/register-seller";
    if (isRegisterSeller && user?.role === "customer") {
      return <>{children}</>;
    }

    // 🔁 Arahkan ke dashboard masing-masing role
    switch (user?.role) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "seller":
        return <Navigate to="/store/profile" replace />;
      case "customer":
        return <Navigate to="/shop/home" replace />;
      default:
        return <Navigate to="/unauth-page" replace />;
    }
  }

  // 3️⃣ Jika role user tidak sesuai dengan yang dibutuhkan
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauth-page" replace />;
  }

  // 4️⃣ Jika akses ke root "/", arahkan sesuai status login
  if (pathname === "/") {
    if (!isAuthenticated) return <Navigate to="/shop/home" replace />;
    if (user?.role === "seller") return <Navigate to="/store/profile" replace />;
    if (user?.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/shop/home" replace />;
  }

  // 5️⃣ Semua aman → tampilkan konten
  return <>{children}</>;
}

export default CheckAuth;
  