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

// Menu navigasi utama
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
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-xs font-normal cursor-pointer hover:font-semibold hover:text-accent"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

// Konten kanan atas header (search, cart, auth)
function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const cartData = useSelector((state) => state.shopCart.cartData || []);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const totalItems = cartData.reduce(
    (total, store) => total + (store.items?.length || 0),
    0
  );
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
    <div className="flex items-center gap-6">
      {/* 🔍 Search */}
      <Button
        onClick={() => navigate("/shop/search")}
        variant="none"
        size="icon"
      >
        <Search className="w-6 h-6" />
      </Button>

      {/* 🛒 Cart */}
      {!user?.id ? (
        <Button
          onClick={() => navigate("/auth/login")}
          variant="none"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">Keranjang belanja</span>
        </Button>
      ) : (
        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="none"
            size="icon"
            className="relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
            <span className="sr-only">Keranjang belanja</span>
          </Button>
          <UserCartWrapper setOpenCartSheet={setOpenCartSheet} />
        </Sheet>
      )}

      {/* 👤 Auth */}
      {!user?.id ? (
        <div className="text-sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/auth/login")}
          >
            Masuk | Daftar
          </Button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-primary">
              <AvatarFallback className="bg-primary text-white font-extrabold">
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

// Header utama
function ShoppingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 lg:px-12 gap-4">
        <Link to="/shop/home" className="flex items-center gap-2 shrink-0">
          <img
            src={logoWaleKreasi}
            alt="Logo Wale Kreasi"
            className="w-8 h-8"
          />
          <span className="font-bold text-xl lg:text-2xl">Wale Kreasi</span>
        </Link>

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

      <div className="hidden lg:flex justify-center border-t px-6 py-2">
        <MenuItems />
      </div>
    </header>
  );
}

export default ShoppingHeader;
