import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ setOpenCartSheet }) {
  const navigate = useNavigate();
  const { cartData } = useSelector((state) => state.shopCart);
  const itemsByStore = cartData || [];

  const totalCartAmount = itemsByStore.reduce((sum, store) => {
    return (
      sum +
      store.items.reduce((storeSum, item) => {
        const product = item.productId || {};
        const price = product.salePrice > 0 ? product.salePrice : product.price || 0;
        return storeSum + price * item.quantity;
      }, 0)
    );
  }, 0);

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Keranjang Anda</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {itemsByStore.length > 0 ? (
          itemsByStore.map((storeGroup) => (
            <div key={storeGroup.storeId} className="mb-6">
              <h3 className="font-bold text-lg mb-2">{storeGroup.storeName}</h3>
              {storeGroup.items.map((item) => (
                <UserCartItemsContent cartItem={item} key={item.productId._id || item.productId} />
              ))}
            </div>
          ))
        ) : (
          <div className="text-center text-sm text-gray-500">
            Keranjang Anda masih kosong.
          </div>
        )}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">Rp. {totalCartAmount.toLocaleString("id-ID")}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/shop/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
