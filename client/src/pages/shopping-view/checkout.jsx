import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, item) =>
            sum +
            (item?.salePrice && item?.salePrice > 0
              ? item.salePrice
              : item.price) * item.quantity,
          0
        )
      : 0;

  function handleInitiateMidtransPayment() {
    if (!cartItems?.items?.length) {
      toast({ title: "Keranjang kosong.", variant: "destructive" });
      return;
    }
    if (!currentSelectedAddress) {
      toast({ title: "Pilih alamat pengiriman.", variant: "destructive" });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price:
          item?.salePrice && item?.salePrice > 0
            ? item?.salePrice
            : item?.price,
        quantity: item?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      totalAmount: Number(totalCartAmount),
    };

    setIsPaymentStart(true);

    dispatch(createNewOrder(orderData)).then((data) => {
      const snapToken = data?.payload?.snapToken;
      if (snapToken) {
        window.snap.pay(snapToken, {
          onSuccess: () => {
            window.location.href = "/shop/payment-success";
          },
          onPending: () => {
            toast({ title: "Transaksi tertunda." });
          },
          onError: () => {
            toast({ title: "Pembayaran gagal.", variant: "destructive" });
          },
          onClose: () => {
            toast({ title: "Transaksi dibatalkan." });
          },
        });
      } else {
        setIsPaymentStart(false);
        toast({
          title: "Gagal membuat pesanan atau mengambil snap token.",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.map((item) => (
            <UserCartItemsContent cartItem={item} key={item.productId} />
          ))}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rp{totalCartAmount.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiateMidtransPayment}
              className="w-full"
              disabled={isPaymentStart}
            >
              {isPaymentStart
                ? "Memproses Pembayaran..."
                : "Bayar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
