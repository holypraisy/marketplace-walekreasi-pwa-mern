import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  console.log(orderDetails, "orderDetails");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Pesanan</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
          <TableRow>
            <TableHead>Kode Pesanan</TableHead>
            <TableHead>Nama Produk</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            
            <TableHead>
              <span className="sr-only">Detail</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList && orderList.length > 0
            ? orderList.map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell>{orderItem?._id}</TableCell>
                  <TableCell>
                    <ul className="list-disc ml-4">
                      {orderItem?.cartItems?.map((item, index) => (
                        <li key={index}>{item.title}</li>
                      ))}
                    </ul>
                  </TableCell>

                  <TableCell>{orderItem?.orderDate?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem?.orderStatus === "confirmed"
                          ? "bg-green-500"
                          : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>Rp.{orderItem?.totalAmount}</TableCell>

                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={() => {
                        setOpenDetailsDialog(false);
                        dispatch(resetOrderDetails());
                      }}
                    >
                      <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                        Lihat Detail
                      </Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>

        </Table>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
