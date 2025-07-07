import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import ShoppingOrderDetailsView from "./order-details";

function ShoppingOrders({ activeStatus }) {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails, isLoading } = useSelector(
    (state) => state.shopOrder
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
  }, [dispatch, user?.id]);

  const filteredOrders =
    activeStatus === "review"
      ? orderList?.filter(
          (order) =>
            order?.orderStatus === "Sudah Diterima" && !order?.isReviewed
        )
      : orderList?.filter((order) => order?.orderStatus === activeStatus);

  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
    setOpenDetailsDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
  };

  if (isLoading)
    return <p className="text-sm text-gray-500">Memuat data...</p>;

  if (!filteredOrders || filteredOrders.length === 0)
    return (
      <p className="text-sm text-gray-500">
        Belum ada pesanan untuk status ini.
      </p>
    );

  return (
    <>
      <div className="space-y-4">
        {filteredOrders.map((orderItem) => (
          <div
            key={orderItem._id}
            className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white"
          >
            {orderItem.cartItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-start"
              >
                {/* Gambar Produk */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md border"
                />

                {/* Info Produk */}
                <div className="flex flex-col justify-between flex-1 text-sm gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-500">
                      Tanggal: {orderItem?.orderDate?.split("T")[0]}
                    </p>
                    <Badge
                      className={`w-fit ${
                        {
                          "Menunggu Konfirmasi": "bg-gray-500",
                          Diproses: "bg-yellow-500",
                          "Dalam Pengiriman": "bg-blue-500",
                          "Sudah Diterima": "bg-green-500",
                          Ditolak: "bg-red-600",
                        }[orderItem?.orderStatus] || "bg-black"
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                    <p className="text-gray-700 font-semibold">
                      Total: Rp.{Number(orderItem?.totalAmount).toLocaleString("id-ID")}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-fit"
                    onClick={() => handleFetchOrderDetails(orderItem._id)}
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Dialog Global */}
      <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-full sm:max-w-[700px] max-h-lvh sm:max-h-[90vh] overflow-y-auto">
          {orderDetails && (
            <ShoppingOrderDetailsView orderDetails={orderDetails} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShoppingOrders;
