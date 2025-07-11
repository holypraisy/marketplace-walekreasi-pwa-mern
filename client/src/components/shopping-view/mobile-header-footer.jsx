import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartItems } from "@/store/shop/cart-slice";
import {
  FiSearch,
  FiShoppingCart,
  FiHome,
  FiUser,
  FiBriefcase,
  FiLogIn,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import logoWaleKreasi from "@/assets/logo-WaleKreasi.png";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartWrapper from "./cart-wrapper";

export default function MobileHeaderFooterLayout({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartData = useSelector((state) => state.shopCart.cartData || []);
  const [openCart, setOpenCart] = useState(false);

  const totalItems = cartData.reduce(
    (total, store) => total + (store.items?.length || 0),
    0
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="min-h-screen flex flex-col pt-14 pb-16 bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <img src={logoWaleKreasi} alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold">WaleKreasi</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/shop/search">
            <FiSearch className="w-6 h-6" />
          </Link>

          {/* Sheet for Cart */}
          <Sheet open={openCart} onOpenChange={setOpenCart}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <FiShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <UserCartWrapper setOpenCartSheet={setOpenCart} />
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Fixed Footer */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow flex justify-around py-2">
        <Link to="/auth/register-seller" className="flex flex-col items-center text-sm">
          <FiBriefcase className="w-5 h-5 mb-1" />
          <span>Jualan</span>
        </Link>

        <Link to="/shop/home" className="flex flex-col items-center text-sm">
          <FiHome className="w-5 h-5 mb-1" />
          <span>Beranda</span>
        </Link>

        <Link
          to={user ? "/shop/account" : "/auth/login"}
          className="flex flex-col items-center text-sm"
        >
          {user ? (
            <>
              <FiUser className="w-5 h-5 mb-1" />
              <span>Akun</span>
            </>
          ) : (
            <>
              <FiLogIn className="w-5 h-5 mb-1" />
              <span>Masuk |   Daftar</span>
            </>
          )}
        </Link>
      </nav>
    </div>
  );
}
