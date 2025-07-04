import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import Footer from "./footer";
import MobileHeaderFooterLayout from "./mobile-header-footer";
import InstallButton from "../common/installButton";

function ShoppingLayout() {
  return (
    <>
      {/* 👇 Mobile layout */}
      <div className="lg:hidden">
        <MobileHeaderFooterLayout>
        <main className="flex-1 w-full">
          <Outlet />
        </main>
          <Footer />
        </MobileHeaderFooterLayout>
      </div>

      {/* 👇 Desktop / tablet layout */}
      <div className="hidden lg:flex flex-col bg-white overflow-hidden min-h-screen">
        <ShoppingHeader />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <InstallButton />
        <Footer />
      </div>
    </>
  );
}

export default ShoppingLayout;
