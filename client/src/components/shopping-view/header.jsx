import { LogOut, Menu, ShoppingCart, UserCog, Search } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-4 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-xs font-normal cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex items-center gap-4">
      {/* 🛒 Cart */}
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">Keranjang belanja</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems?.items?.length > 0 ? cartItems.items : []
          }
        />
      </Sheet>

      {/* 👤 Avatar */}
      {(user?.userName || user?.name) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {(user?.userName || user?.name || user?.email || "?")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>
              Masuk sebagai {user?.userName || user?.name || "Pengguna"}
            </DropdownMenuLabel>
              <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                    <UserCog className="mr-2 h-4 w-4" />
                    Akun
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

    </div>
  );
}

function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 lg:px-12 gap-4">
        {/* 👈 Logo */}
        <Link to="/shop/home" className="flex items-center gap-2 shrink-0">
          <img
            src={logoWaleKreasi}
            alt="Logo Wale Kreasi"
            className="w-8 h-8 "
          />
          <span className="font-bold text-xl lg:text-2xl">Wale Kreasi</span>
        </Link>

        {/* 🔍 Search bar (center on desktop) */}
        <div
          onClick={() => window.location.href = "/shop/search"}
          className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full border bg-white hover:bg-gray-100 transition-colors w-full max-w-md cursor-pointer"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Cari produk...</span>
        </div>

        {/* 👉 Right content */}
        <div className="hidden lg:flex items-center gap-4">
          <HeaderRightContent />
        </div>

        {/* ☰ Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <div className="mt-4">
              <HeaderRightContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* 📁 Menu bawah (desktop) */}
      <div className="hidden lg:flex justify-center border-t px-6 py-2">
        <MenuItems />
      </div>
    </header>
  );
}

export default ShoppingHeader;