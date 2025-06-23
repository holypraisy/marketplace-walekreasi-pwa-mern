// Updated UserCartWrapper component to show grouped items by store
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const itemsByStore = cartItems?.itemsByStore || [];

  const totalCartAmount = itemsByStore.reduce((sum, store) => {
    return (
      sum +
      store.items.reduce((storeSum, item) => {
        const price = item?.salePrice > 0 ? item.salePrice : item.price;
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
        {itemsByStore.length > 0
          ? itemsByStore.map((storeGroup) => (
              <div key={storeGroup.storeId} className="mb-6">
                <h3 className="font-bold text-lg mb-2">{storeGroup.storeName}</h3>
                {storeGroup.items.map((item) => (
                  <UserCartItemsContent cartItem={item} key={item.productId} />
                ))}
              </div>
            ))
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">Rp.{totalCartAmount}</span>
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
