import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import StarRatingComponent from "../../components/common/star-rating"; // sesuaikan jika perlu
import { addReview } from "@/store/shop/review-slice"; // GANTI ke addReview

function ShoppingOrderDetailsView({ orderDetails }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const item = orderDetails?.cartItems?.[0]; // hanya tampilkan 1 produk

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmitReview = async () => {
  setIsSubmitting(true);
  try {
    const formData = {
      userId: user.id,
      productId: item.productId,
      orderId: orderDetails._id,
      userName: user?.name || "Pengguna",
      reviewValue: rating,
      reviewMessage: comment,
    };

    await dispatch(addReview(formData)).unwrap();

    toast({
      title: "Review berhasil dikirim",
      description: "Terima kasih atas ulasannya!",
    });

    if (onClose) onClose(); 
  } catch (err) {
    console.error(err);
    toast({
      title: "Gagal mengirim ulasan",
      description: "Silakan coba lagi nanti.",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <DialogContent className="max-w-full md:max-w-screen-md max-h-lvh md:max-h-[80vh] overflow-y-auto">
      <div className="grid gap-6">
        {/* Judul */}
        <h2 className="text-xl font-bold text-gray-800 text-center sm:text-left">
          Detail Pesanan
        </h2>

        {/* Gambar + Info Produk */}
        <div className="flex flex-col sm:flex-row gap-6 items-start border rounded-lg p-4 bg-gray-50">
          <img
            src={item?.image}
            alt={item?.title}
            className="w-full sm:w-48 sm:h-48 object-cover rounded-md border"
            onError={(e) => (e.target.src = "/default-placeholder.png")}
          />
          <div className="flex flex-col gap-3 text-sm w-full">
            <div className="flex items-center justify-between">
              <span className="font-light">Kode Pesanan</span>
              <Label className="font-medium break-all text-right">
                {orderDetails?._id}
              </Label>
            </div>
            <div className="flex flex-col">
              <span className="font-light">Nama Produk</span>
              <span className="font-medium">{item?.title}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-light">Jumlah</span>
              <span className="font-medium">{item?.quantity}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-light">Total Harga</span>
              <span className="font-semibold text-gray-800">
                Rp.{Number(orderDetails?.totalAmount).toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>

        {/* Status Pembayaran & Pesanan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col p-3 border rounded-md bg-white">
            <span className="font-medium text-gray-700 mb-1">Status Pembayaran</span>
            <span className="text-gray-600">{orderDetails?.paymentStatus}</span>
          </div>
          <div className="flex flex-col p-3 border rounded-md bg-white">
            <span className="font-medium text-gray-700 mb-1">Status Pesanan</span>
            <Badge
              className={`w-fit py-1 px-3 ${
                orderDetails?.orderStatus === "Dikonfirmasi"
                  ? "bg-green-500"
                  : orderDetails?.orderStatus === "Ditolak"
                  ? "bg-red-600"
                  : "bg-black"
              }`}
            >
              {orderDetails?.orderStatus}
            </Badge>
          </div>
        </div>

        {/* Informasi Pengiriman */}
        <div className="grid gap-4 mt-2">
          <div className="font-medium">Informasi Pengiriman</div>
          <div className="grid gap-1 text-sm text-muted-foreground">
            <span>{user?.userName}</span>
            <span>{orderDetails?.addressInfo?.receiverName}</span>
            <span>{orderDetails?.addressInfo?.address}</span>
            <span>{orderDetails?.addressInfo?.city}</span>
            <span>{orderDetails?.addressInfo?.pincode}</span>
            <span>{orderDetails?.addressInfo?.phone}</span>
            <span>{orderDetails?.addressInfo?.notes}</span>
          </div>
        </div>

        {/* Form Review */}
        {orderDetails?.orderStatus === "Sudah Diterima" && !item?.isReviewed && (
          <div className="border p-4 rounded-md bg-white space-y-4 mt-6">
            <p className="font-medium text-gray-800">Beri Ulasan</p>
            <StarRatingComponent rating={rating} handleRatingChange={setRating} />
            <textarea
              className="w-full p-2 border rounded-md text-sm"
              rows="4"
              placeholder="Tulis ulasan produk ini..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              disabled={isSubmitting || rating === 0}
              onClick={handleSubmitReview}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Review"}
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
