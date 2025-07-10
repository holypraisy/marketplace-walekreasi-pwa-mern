import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  updateCartQuantity,
  fetchCartItems,
} from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const product = cartItem.productId;
  if (!product || typeof product !== "object") return null;

  const currentQty = cartItem.quantity;
  const totalStock = product?.totalStock || 0;
  const unitPrice =
    product.salePrice > 0 ? product.salePrice : product.price || 0;
  const totalPrice = unitPrice * currentQty;

  const handleUpdateQuantity = async (type) => {
    if (!user?.id || !product?._id) return;

    let newQty = currentQty;

    if (type === "plus") {
      if (currentQty >= totalStock) {
        toast({
          title: `Stok tidak mencukupi. Maksimum ${totalStock} item.`,
          variant: "destructive",
        });
        return;
      }
      newQty = currentQty + 1;
    } else if (type === "minus") {
      if (currentQty <= 1) {
        handleCartItemDelete();
        return;
      }
      newQty = currentQty - 1;
    }

    const res = await dispatch(
      updateCartQuantity({
        userId: user.id,
        productId: product._id,
        quantity: newQty,
      })
    );

    if (res?.payload?.success) {
      dispatch(fetchCartItems(user.id));
      toast({ title: "Jumlah item diperbarui." });
    } else {
      toast({ title: "Gagal memperbarui item.", variant: "destructive" });
    }
  };

  const handleCartItemDelete = async () => {
    if (!user?.id || !product?._id) return;

    const res = await dispatch(
      deleteCartItem({ userId: user.id, productId: product._id })
    );

    if (res?.payload?.success) {
      dispatch(fetchCartItems(user.id));
      toast({ title: "Barang dihapus dari keranjang." });
    } else {
      toast({ title: "Gagal menghapus item.", variant: "destructive" });
    }
  };

  return (
    <div className="flex gap-3 py-3 border rounded-lg px-3 shadow-sm items-start">
      <img
        src={product.image}
        alt={product.title}
        className="w-20 h-20 rounded object-cover flex-shrink-0"
      />
      <div className="flex-1 flex flex-col justify-between">
        {/* Judul dan ikon delete */}
        <div className="flex justify-between items-start">
          <p className="font-semibold text-sm md:text-base leading-snug">
            {product.title}
          </p>
          <Trash
            onClick={handleCartItemDelete}
            className="w-4 h-4 md:w-6 md:h-6 text-red-500 hover:text-red-600 cursor-pointer mt-1"
          />
        </div>

        {/* Qty dan harga */}
        <div className="mt-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={() => handleUpdateQuantity("minus")}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-sm font-semibold">{currentQty}</span>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full"
              onClick={() => handleUpdateQuantity("plus")}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm font-bold mt-2">
            Rp {totalPrice.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
