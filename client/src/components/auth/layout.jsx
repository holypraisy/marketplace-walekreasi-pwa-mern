import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { fetchBanners, selectIntroBanners } from "@/store/admin/banner-slice";

function AuthLayout() {
  const dispatch = useDispatch();
  const introBanners = useSelector(selectIntroBanners);
  const isLoading = useSelector((state) => state.banner?.isLoading) || false;
  const [currentIndex, setCurrentIndex] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  // Auto slide
  useEffect(() => {
    if (introBanners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % introBanners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [introBanners]);

  const currentBanner = introBanners[currentIndex];

  const handleScrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen w-full">
      {/* Banner Section */}
      <div
        className="relative col-span-1 md:col-span-2 h-screen md:h-auto cursor-pointer md:cursor-default"
        onClick={() => {
          if (window.innerWidth < 768) handleScrollToForm();
        }}
      >

        {isLoading ? (
          <div className="flex items-center justify-center h-full bg-primary text-white text-lg">
            Memuat banner...
          </div>
        ) : introBanners.length === 0 ? (
          <div className="flex items-center justify-center h-full bg-primary text-white">
            Tidak ada banner intro tersedia.
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <img
                src={currentBanner.imageUrl}
                alt="Banner"
                className="w-full h-full object-cover"
              />

              {/* Overlay only on mobile */}
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4 ">
                {currentBanner.caption && (
                  <h2 className="text-white text-xl font-bold mb-4 drop-shadow">
                    {currentBanner.caption}
                  </h2>
                )}
                <button
                  onClick={handleScrollToForm}
                  className="bg-white text-primary font-semibold py-2 px-4 rounded-full shadow hover:bg-gray-100 transition md:hidden"
                >
                  Masuk Sekarang →
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Login/Register Section */}
      <div
        ref={formRef}
        className="col-span-1 flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8"
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

