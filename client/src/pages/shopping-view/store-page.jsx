import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreBySellerId } from "@/store/shop/store-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { fetchCartItems, addToCart } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";

const StoreFrontPage = () => {
  const { sellerId } = useParams();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { store, products, loading, error } = useSelector((state) => state.shopStore);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetailsLocal] = useState(null);

  useEffect(() => {
    if (sellerId) {
      dispatch(fetchStoreBySellerId(sellerId));
    }
  }, [dispatch, sellerId]);

  const handleGetProductDetails = (productId) => {
    const product = products.find((p) => p._id === productId);
    if (product) {
      setProductDetailsLocal(product); // ✅ Ini cukup, tidak perlu Redux
      setOpen(true);
    }
    
  };

  const handleAddtoCart = (productId, totalStock) => {
    const existingItems = cartItems.items || [];
    const cartItem = existingItems.find((item) => item.productId === productId);
    const quantity = cartItem ? cartItem.quantity : 0;

    if (quantity + 1 > totalStock) {
      toast({
        title: `Hanya tersedia ${totalStock} item.`,
        variant: "destructive",
      });
      return;
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Produk ditambahkan ke keranjang." });
      }
    });
  };

  return (
    <div className="p-4">
      {store?.storeBannerUrl && (
        <img
          src={store.storeBannerUrl}
          alt="Banner Toko"
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
      )}

      <div className="flex items-center gap-4 mb-6">
        {store?.storeLogoUrl && (
          <img
            src={store.storeLogoUrl}
            alt="Logo Toko"
            className="w-20 h-20 rounded-full object-cover border"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{store?.storeName}</h1>
          <p className="text-sm text-gray-600">{store?.productionAddress}</p>
        </div>
      </div>

      <p className="mb-6 text-gray-800">{store?.storeDescription}</p>

      <h2 className="text-xl font-semibold mb-4">Etalase Produk</h2>
      {Array.isArray(products) && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ShoppingProductTile
              key={product._id}
              product={product}
              handleGetProductDetails={handleGetProductDetails}
              handleAddtoCart={handleAddtoCart}
            />
          ))}
        </div>
      ) : (
        <p>Toko ini belum memiliki produk.</p>
      )}

      <ProductDetailsDialog
        open={open}
        setOpen={setOpen}
        productDetails={productDetails}
      />
    </div>
  );
};

export default StoreFrontPage;
