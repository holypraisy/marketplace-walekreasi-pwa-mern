import {
    BadgeCheck,
    ChartNoAxesCombined,
    LayoutDashboard,
    ShoppingBasket,
  } from "lucide-react";
  import { Fragment, useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
  import axios from "axios";
  
  const sellerSidebarMenuItems = [
    {
      id: "profil-toko",
      label: "Profil Toko",
      path: "/store/profile",
      icon: <LayoutDashboard />,
    },
    {
      id: "products",
      label: "Produk",
      path: "/store/products",
      icon: <ShoppingBasket />,
    },
    {
      id: "pesanan",
      label: "Pesanan",
      path: "/store/orders",
      icon: <BadgeCheck />,
    },
  ];
  
  function MenuItems({ setOpen }) {
    const navigate = useNavigate();
  
    return (
      <nav className="mt-8 flex-col flex gap-2">
        {sellerSidebarMenuItems.map((menuItem) => (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className="flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </div>
        ))}
      </nav>
    );
  }
  
  function SellerSideBar({ open, setOpen }) {
    const navigate = useNavigate();
    const [storeName, setStoreName] = useState("Panel Toko");
  
    useEffect(() => {
      // Ambil data toko dari backend
      const fetchStore = async () => {
        try {
          const res = await axios.get("/api/store/profile"); // Pastikan route ini tersedia di backend
          if (res.data && res.data.store) {
            setStoreName(res.data.store.name);
          }
        } catch (err) {
          console.error("Gagal mengambil data toko:", err);
        }
      };
  
      fetchStore();
    }, []);
  
    return (
      <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full">
              <SheetHeader className="border-b">
                <SheetTitle className="flex gap-2 mt-5 mb-5 items-center">
                  <ChartNoAxesCombined size={30} />
                  <h1 className="text-xl font-bold">{storeName}</h1>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
  
        <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
          <div
            onClick={() => navigate("/seller/dashboard")}
            className="flex cursor-pointer items-center gap-2"
          >
            <ChartNoAxesCombined size={30} />
            <h1 className="text-xl font-bold">{storeName}</h1>
          </div>
          <MenuItems />
        </aside>
      </Fragment>
    );
  }
  
  export default SellerSideBar;