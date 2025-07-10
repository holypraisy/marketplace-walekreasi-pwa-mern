import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import AddressSelected from "@/components/shopping-view/address-selected";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function ShoppingCheckout() {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { cartData } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const [showAddressDialog, setShowAddressDialog] = useState(false);

  const totalCartAmount =
    cartData?.reduce((sum, storeGroup) => {
      return (
        sum +
        storeGroup.items.reduce((storeSum, item) => {
          const product = item.productId?._id
            ? item.productId
            : productList.find((p) => p._id === item.productId);

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
    <div className="flex flex-col gap-4 mt-5 p-5 max-w-6xl mx-auto">
      {/* SECTION: Alamat Terpilih */}
      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
        <AddressSelected
          selectedAddress={currentSelectedAddress}
          onChoose={() => setShowAddressDialog(true)}
        />
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <Address
            selectedId={currentSelectedAddress}
            setCurrentSelectedAddress={(address) => {
              setCurrentSelectedAddress(address);
              setShowAddressDialog(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* SECTION: Daftar Produk dalam Keranjang */}
      <div className="flex flex-col gap-4 border rounded-md p-4 bg-white shadow-sm">
        {cartData?.map((storeGroup) => (
          <div key={storeGroup.storeId}>
            <h3 className="font-semibold text-sm mb-2 text-gray-700">
              Toko: {storeGroup.storeName}
            </h3>
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
      </div>

      {/* SECTION: Total & Tombol Bayar */}
      <div className="flex flex-col items-end gap-3">
        <div className="text-right text-sm">
          <p className="text-gray-600">Total Belanja:</p>
          <p className="text-xl font-semibold text-gray-800">
            Rp {totalCartAmount.toLocaleString("id-ID")}
          </p>
        </div>

        <Button
          onClick={handleInitiateMidtransPayment}
          className="w-full sm:w-auto"
          disabled={isPaymentStart}
        >
          {isPaymentStart ? "Memproses Pembayaran..." : "Bayar"}
        </Button>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
