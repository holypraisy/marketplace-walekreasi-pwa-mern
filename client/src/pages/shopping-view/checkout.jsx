import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
  const { cartData } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const totalCartAmount =
    cartData?.reduce((sum, storeGroup) => {
      return (
        sum +
        storeGroup.items.reduce((storeSum, item) => {
          const product = item.productId?._id ? item.productId : productList.find(
            (p) => p._id === item.productId
          );

          if (!product) return storeSum;

          const price =
            product.salePrice > 0 ? product.salePrice : product.price || 0;

          return storeSum + price * item.quantity;
        }, 0)
      );
    }, 0) || 0;


  function handleInitiateMidtransPayment() {
    if (!cartData?.length) {
      toast({ title: "Keranjang kosong.", variant: "destructive" });
      return;
    }
    if (!currentSelectedAddress) {
      toast({ title: "Pilih alamat pengiriman.", variant: "destructive" });
      return;
    }

    const allItems = cartData.flatMap((storeGroup) =>
      storeGroup.items.map((item) => {
        const product = productList.find(
          (p) => p?._id?.toString() === item?.productId?.toString()
        );
        return {
          productId: item.productId,
          title: product?.title || "Produk",
          image: product?.image || "",
          price:
            product?.salePrice > 0 ? product.salePrice : product?.price || 0,
          quantity: item.quantity,
        };
      })
    );

    const orderData = {
      userId: user?.id,
      cartItems: allItems,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartData?.map((storeGroup) => (
            <div key={storeGroup.storeId}>
              <h3 className="font-bold mb-2">{storeGroup.storeName}</h3>
              {storeGroup.items.map((item) => {
                const product = productList.find(
                  (p) => p?._id?.toString() === item?.productId?.toString()
                );
                return (
                  <UserCartItemsContent
                    cartItem={{ ...item, product }}
                    key={item.productId}
                  />
                );
              })}
            </div>
          ))}

          <div className="mt-4 flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">
              Rp {totalCartAmount.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="mt-4 w-full">
            <Button
              onClick={handleInitiateMidtransPayment}
              className="w-full"
              disabled={isPaymentStart}
            >
              {isPaymentStart ? "Memproses Pembayaran..." : "Bayar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
