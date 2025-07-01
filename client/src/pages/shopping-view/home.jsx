import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import {
  fetchBanners,
  selectLandingBanners,
} from "@/store/admin/banner-slice";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Lamp,
  Gift,
  ChevronLeftIcon,
  ChevronRightIcon,
  Shirt,
  Brush,
  Sprout,
} from "lucide-react";

const categoriesWithIcon = [
  { id: "home-decor", label: "Dekorasi Rumah", icon: Lamp },
  { id: "accessories-fashion", label: "Aksesori & Fashion", icon: Shirt },
  { id: "souvenirs", label: "Souvenir & Oleh-Oleh", icon: Gift },
  { id: "traditional-tools", label: "Peralatan Tradisional", icon: Brush },
  { id: "eco-friendly", label: "Produk Ramah Lingkungan", icon: Sprout },
];

function ShoppingHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const landingBanners = useSelector(selectLandingBanners);

  // Auto scroll banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % landingBanners.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [landingBanners]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  function handleNavigateToListingPage(item, section) {
    sessionStorage.removeItem("filters");
    const filter = {
      [section]: [item.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(filter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(productId) {
    dispatch(fetchProductDetails(productId));
  }

  function handleAddToCart(productId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Produk berhasil dimasukkan ke keranjang" });
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {landingBanners && landingBanners.length > 0 ? (
          landingBanners.map((slide, index) => (
            <div key={index}>
              <img
                src={slide?.imageUrl}
                alt={slide?.caption || "Banner"}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
              {index === currentSlide && slide.caption && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-4">
                  <h2 className="text-white text-2xl md:text-4xl font-bold drop-shadow text-center">
                    {slide.caption}
                  </h2>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-600">
            Tidak ada banner landing tersedia.
          </div>
        )}

        {/* Navigation Buttons */}
        {landingBanners.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentSlide(
                  (prev) =>
                    (prev - 1 + landingBanners.length) % landingBanners.length
                )
              }
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % landingBanners.length)
              }
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Category Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Belanja Berdasarkan Kategori
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((item) => (
              <Card
                key={item.id}
                onClick={() => handleNavigateToListingPage(item, "category")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center text-center p-6">
                  <item.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{item.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Produk Unggulan */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Produk Unggulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0 ? (
              productList.map((product) => (
                <ShoppingProductTile
                  key={product._id}
                  product={product}
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddToCart}
                />
              ))
            ) : (
              <p className="col-span-full text-center">Tidak ada produk</p>
            )}
          </div>
        </div>
      </section>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
