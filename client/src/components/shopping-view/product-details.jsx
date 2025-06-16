import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Store, ShoppingCart } from "lucide-react";
import StarRatingComponent from "../common/star-rating"; 

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleAddToCart(productId, totalStock) {
    const existingItems = cartItems.items || [];
    const cartItem = existingItems.find((item) => item.productId === productId);
    const quantity = cartItem ? cartItem.quantity : 0;

    if (quantity + 1 > totalStock) {
      toast({
        title: `Hanya tersedia ${totalStock} item.`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Produk ditambahkan ke keranjang." });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({ title: "Review berhasil ditambahkan!" });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReviews(productDetails?._id));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.reviewValue, 0) / reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:p-8 max-w-[90vw] md:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <DialogTitle asChild>
            <h1 className="text-2xl md:text-3xl font-extrabold">{productDetails?.title}</h1>
          </DialogTitle>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <FaStar className="text-yellow-400" />
            <span>{averageReview.toFixed(1)}</span>
          </div>

          
          {/* Deskripsi */}
          <div className="mt-4">
            <h2 className="text-sm text-muted-foreground mb-1">Deskripsi:</h2>
            <p className="text-sm text-gray-700">
              {productDetails?.description || "Tidak ada deskripsi produk."}
            </p>
          </div>


          {/* Info toko + kunjungi */}
          {productDetails?.storeName && productDetails?.sellerId && (
            <div className="flex justify-between items-center mt-3">
              <div className="text-sm flex items-center gap-1 text-muted-foreground">
                <Store className="text-primary w-5" />
                <span className="font-bold text-base  text-gray-800">
                   {productDetails.storeName}
                </span>
              </div>
              <Link
                to={`/shop/store/${productDetails.sellerId}`}
                className="text-sm bg-primary text-white px-2 py-1 rounded hover:opacity-90"
              >
                Kunjungi
              </Link>
            </div>
          )}

          {/* Harga */}
          <div className="flex items-center justify-between mt-4">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails.salePrice}
              </p>
            )}
          </div>


          {/* Tombol Add to Cart */}
          <div className="mt-5 mb-5 grid justify-end">
            {productDetails?.totalStock === 0 ? (
              <Button className="opacity-60 cursor-not-allowed">
                Stok Habis
              </Button>
            ) : (
              <button
                onClick={() =>
                  handleAddToCart(productDetails?._id, productDetails?.totalStock)
                }
                className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md transition-all duration-300 overflow-hidden group"
              >
                {/* Ikon keranjang */}
                <ShoppingCart className="h-5 w-5 flex-shrink-0" />

                {/* Teks yang muncul saat hover */}
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
                  Tambah ke Keranjang
                </span>
              </button>
            )}
          </div>






          <Separator />

          {/* Review Section */}
          <div className="max-h-[300px] overflow-auto mt-4">
            <h2 className="text-xl font-bold mb-2">Ulasan</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((review) => (
                  <div className="flex gap-4" key={review._id}>
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {review?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <h3 className="font-bold">{review?.userName}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FaStar className="text-yellow-400 mr-1" />
                        {review?.reviewValue}
                      </div>
                      <p className="text-muted-foreground">{review.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada ulasan.</p>
              )}
            </div>

            {/* ⭐ Input Review: Tetap 5 bintang */}
            <div className="mt-8 flex flex-col gap-2">
              <Label>Berikan Ulasan</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={(value) => setRating(value)}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Tulis ulasan Anda..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Kirim
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
