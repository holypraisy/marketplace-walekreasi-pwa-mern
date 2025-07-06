import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  const item = orderDetails?.cartItems?.[0]; // hanya ambil 1 produk pertama

  return (
    <DialogContent className="max-w-full md:max-w-screen-md max-h-lvh md:max-h-[80vh] overflow-y-auto">
      <div className="grid gap-6">
        {/* Judul */}
        <h2 className="text-xl font-bold text-gray-800 text-center sm:text-left">
          Detail Pesanan
        </h2>

        {/* Gambar + Info Produk */}
        <div className="flex flex-col sm:flex-row gap-6 items-start border rounded-lg p-4 bg-gray-50">
          {/* Gambar Produk */}
          <img
            src={item?.image}
            alt={item?.title}
            className="w-full sm:w-48 sm:h-48 object-cover rounded-md border"
            onError={(e) => (e.target.src = "/default-placeholder.png")}
          />

          {/* Info Produk */}
          <div className="flex flex-col gap-3 text-sm w-full">
            <div className="flex items-center justify-between">
              <span className="font-light">Kode Pesanan</span>
              <Label className="font-medium break-all text-right">{orderDetails?._id}</Label>
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

        {/* Info Pengiriman */}
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
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
