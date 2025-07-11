import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";
import { Separator } from "../ui/separator";

import { useToast } from "../ui/use-toast";
import { FaStar } from "react-icons/fa";
import { Store, ShoppingCart } from "lucide-react";

import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user } = useSelector((state) => state.auth);
  const { cartData } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const isControlled = typeof open === "boolean" && typeof setOpen === "function";

  const handleDialogChange = (openState) => {
    if (isControlled && !openState) {
      setOpen(false);
      setRating(0);
    }
  };

  useEffect(() => {
    if (productDetails) {
      dispatch(getReviews(productDetails._id));
    }
  }, [productDetails]);

  const averageReview = reviews?.length
    ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
    : 0;

  const handleAddToCart = () => {
    if (!user) {
      toast({ title: "Silakan login terlebih dahulu." });
      return navigate("/auth/login");
    }

    if (user.role !== "customer") {
      return toast({
        title: "Akses ditolak",
        description: "Hanya pelanggan yang bisa menambahkan ke keranjang.",
        variant: "destructive",
      });
    }

    const allItems = cartData?.flatMap((group) => group.items) || [];
    const existingItem = allItems.find(
      (item) =>
        item?.productId?._id?.toString?.() === productDetails._id ||
        item?.productId?.toString?.() === productDetails._id
    );
    const currentQty = existingItem?.quantity || 0;

    if (currentQty + 1 > productDetails.totalStock) {
      toast({
        title: `Hanya tersedia ${productDetails.totalStock} item.`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user.id,
        productId: productDetails._id,
        quantity: 1,
      })
    ).then((res) => {
      if (res.payload?.success) {
        dispatch(fetchCartItems(user.id));
        toast({ title: "Produk ditambahkan ke keranjang." });
      } else {
        toast({
          title: res.payload?.message || "Gagal menambahkan produk.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Dialog open={isControlled ? open : undefined} onOpenChange={handleDialogChange}>
      <DialogContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[95vw] lg:max-w-[80vw] overflow-y-auto max-h-[90vh]">
        {/* Gambar Produk */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="w-full max-h-[320px] object-cover rounded-lg"
          />
        </div>

        {/* Detail Produk */}
        <div className="flex flex-col">
          <DialogHeader>
            <DialogTitle asChild>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug">
                {productDetails?.title}
              </h1>
            </DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <FaStar className="text-yellow-400" />
            <span>{averageReview.toFixed(1)}</span>
          </div>

          {/* Deskripsi */}
          <div className="mt-4">
            <h2 className="text-sm font-semibold text-muted-foreground mb-1">Deskripsi:</h2>
            <p className="text-sm text-gray-700">
              {productDetails?.description || "Tidak ada deskripsi produk."}
            </p>
          </div>

          {/* Toko */}
          {productDetails?.storeName && productDetails?.sellerId && (
            <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
              <div className="text-sm flex items-center gap-1 text-muted-foreground">
                <Store className="text-primary w-5 h-5" />
                <span className="font-semibold text-gray-800">{productDetails.storeName}</span>
              </div>
              <Link
                to={`/shop/store/${productDetails.sellerId}`}
                className="text-xs sm:text-sm bg-primary text-white px-3 py-1 rounded hover:opacity-90"
              >
                Kunjungi Toko
              </Link>
            </div>
          )}

          {/* Harga */}
          <div className="flex items-center justify-between mt-4">
            <p
              className={`text-2xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              Rp. {productDetails?.price?.toLocaleString("id-ID")}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-xl font-bold text-muted-foreground">
                Rp. {productDetails.salePrice?.toLocaleString("id-ID")}
              </p>
            )}
          </div>

          {/* Tombol Tambah ke Keranjang */}
          <div className="mt-5">
            {productDetails?.totalStock === 0 ? (
              <Button className="opacity-60 cursor-not-allowed w-full">Stok Habis</Button>
            ) : (
              <Button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 w-full bg-primary text-white px-4 py-2 rounded-md"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm">Tambah ke Keranjang</span>
              </Button>
            )}
          </div>

          <Separator className="my-5" />

          {/* Ulasan */}
          <div className="max-h-[250px] overflow-y-auto pr-1">
            <h2 className="text-lg font-bold mb-3">Ulasan</h2>
            <div className="grid gap-4">
              {reviews?.length > 0 ? (
                reviews.map((review) => (
                  <div className="flex gap-3" key={review._id}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {review?.userName?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{review?.userName}</span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FaStar className="text-yellow-400 mr-1" />
                        {review?.reviewValue}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada ulasan.</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
