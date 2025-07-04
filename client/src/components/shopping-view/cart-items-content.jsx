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

  // Pastikan product hasil populate
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
      dispatch(fetchCartItems(user.id)); // ✅ Ambil ulang cart yang lengkap dengan populate
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
      dispatch(fetchCartItems(user.id)); // ✅ Ambil ulang cart
      toast({ title: "Barang dihapus dari keranjang." });
    } else {
      toast({ title: "Gagal menghapus item.", variant: "destructive" });
    }
  };

  return (
    <div className="flex items-center space-x-4 py-2 border-b">
      <img
        src={product.image}
        alt={product.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="md:flex md:flex-1 ">
        <div className="flex-1 ">
          <h3 className="font-extrabold text-base">{product.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              onClick={() => handleUpdateQuantity("minus")}
            >
              <Minus className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
            <span className="font-semibold text-sm md:text-base ">{currentQty}</span>
            <Button
              variant="outline"
              className="h-8 w-8 rounded-full"
              size="icon"
              onClick={() => handleUpdateQuantity("plus")}
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-14 md:gap-0 mt-1 md:flex md:flex-col md:items-end">
          <p className="font-semibold mt-1">
            Rp {totalPrice.toLocaleString("id-ID")}
          </p>
          <Trash
            onClick={handleCartItemDelete}
            className="cursor-pointer mt-1 text-red-500"
            size={20}
          />
        </div>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
