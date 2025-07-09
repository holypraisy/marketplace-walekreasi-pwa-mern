import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Badge } from "@/components/ui/badge";
import ShoppingOrderDetailsView from "./order-details";

function ShoppingOrders({ activeStatus }) {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [scrollToReview, setScrollToReview] = useState(false); // ✅ NEW
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
            order.orderStatus === "Sudah Diterima" &&
            order.cartItems.some((item) => item.isReviewed === false)
        )
      : orderList?.filter((order) => order.orderStatus === activeStatus);

  const handleFetchOrderDetails = (orderId, reviewMode = false) => {
    setScrollToReview(reviewMode); // ✅ aktifkan scroll jika dari tombol review
    dispatch(getOrderDetails(orderId));
    setOpenDetailsDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    dispatch(resetOrderDetails());
    setScrollToReview(false); // ✅ reset scroll state
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
            {orderItem.cartItems
              .filter(
                (item) =>
                  activeStatus !== "review" || item.isReviewed === false
              )
              .map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded-md border"
                  />

                  <div className="flex flex-col justify-between flex-1 text-sm gap-4">
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-gray-800">
                        {item.title}
                      </p>
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
                        Total: Rp.
                        {Number(orderItem?.totalAmount).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-fit"
                        onClick={() => handleFetchOrderDetails(orderItem._id)}
                      >
                        Lihat Detail
                      </Button>

                      {activeStatus === "review" && (
                        <Button
                          size="sm"
                          className="w-fit bg-yellow-500 hover:bg-yellow-600 text-white"
                          onClick={() =>
                            handleFetchOrderDetails(orderItem._id, true)
                          }
                        >
                          Beri Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {/* Dialog Global */}
      <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-full sm:max-w-[700px] max-h-lvh sm:max-h-[90vh] overflow-y-auto">
          <VisuallyHidden>
            <DialogTitle>Detail Pesanan</DialogTitle>
          </VisuallyHidden>
          
          {orderDetails && (
            <ShoppingOrderDetailsView
              orderDetails={orderDetails}
              scrollToReview={scrollToReview}
              onClose={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShoppingOrders;