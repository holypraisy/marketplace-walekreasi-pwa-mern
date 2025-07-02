import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";

import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import RegisterSeller from "./pages/auth/registerSeller"; // tetap
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import NotFound from "./pages/not-found";

import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import StoreFrontPage from "./pages/shopping-view/store-page";

import SellerDashboardLayout from "./components/seller-dashboard/layout";
import SellerProducts from "./pages/seller-dashboard/products";
import SellerProfilePage from "./pages/seller-dashboard/profil";
import SellerOrders from "./pages/seller-dashboard/orders";
import SellerDetailPage from "./pages/admin/sellerDetail";

import AdminDashboardLayout from "./components/admin/layout";
import PayoutPage from "./pages/admin/PayoutPage";
import AdminDashboardPage from "./pages/admin/dashboard";
import SellersInfoPage from "./pages/admin/sellersInfo";
import CustomersInfoPage from "./pages/admin/customersInfo";
import TransactionsPage from "./pages/admin/transactionsPage";
import TransactionDetailPage from "./pages/admin/transactionsDetailPage";
import AdminSettingPage from "./pages/admin/settingPage";

import { requestForToken, onMessageListener } from "./firebase/firebase.config";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    dispatch(checkAuth());

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);

  useEffect(() => {
    if (user?.role === "customer") {
      requestForToken(user.id);
      onMessageListener().then((payload) => {
        Toast({
          title: payload.notification?.title,
          description: payload.notification?.body,
        });
      });
    }
  }, [user]);

  if (isLoading) return <Skeleton className="w-[800px] bg-black h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white min-h-screen">
      {isOffline && (
        <div className="bg-red-500 text-white text-center py-2 text-sm font-semibold z-50">
          🔌 Anda sedang offline. Beberapa fitur mungkin tidak tersedia.
        </div>
      )}

      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user} />} />

        {/* ✅ Register Seller FULLSCREEN tanpa AuthLayout */}
        <Route
          path="/auth/register-seller"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <RegisterSeller />
            </CheckAuth>
          }
        />

        {/* ✅ Halaman Auth biasa */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* ✅ Seller */}
        <Route
          path="/store"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <SellerDashboardLayout />
            </CheckAuth>
          }
        >
          <Route path="profile" element={<SellerProfilePage />} />
          <Route path="products" element={<SellerProducts />} />
          <Route path="orders" element={<SellerOrders />} />
        </Route>

        {/* ✅ Customer */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="store/:sellerId" element={<StoreFrontPage />} />
        </Route>

        {/* ✅ Admin */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminDashboardLayout />
            </CheckAuth>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="payout" element={<PayoutPage />} />
          <Route path="sellers" element={<SellersInfoPage />} />
          <Route path="seller/:id" element={<SellerDetailPage />} />
          <Route path="customers" element={<CustomersInfoPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="transactions/:id" element={<TransactionDetailPage />} />
          <Route path="setting" element={<AdminSettingPage />} />
        </Route>

        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
