import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreBySellerId } from "@/store/shop/store-slice";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { fetchCartItems, addToCart } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import {  MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";


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
      setProductDetailsLocal(product); 
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
    <div className="p-8 lg:p-12 grid gap-12">
        <div className="rounded-xl shadow-md border-2 p-4 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-start gap-4">
            {store?.storeLogoUrl && (
              <img
                src={store.storeLogoUrl}
                alt="Logo Toko"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border"
              />
            )}
            <div>
              <h1 className="text-lg md:text-2xl font-bold">{store?.storeName}</h1>
              <p className="text-xs md:text-sm text-gray-600 flex items-center gap-1">
                <MapPin className="w-3 md:w-4" />
                {store?.productionAddress}
              </p>
            </div>
          </div>

          {store?.phoneNumber && (
            <a
              href={`https://wa.me/${store.phoneNumber.replace(/^0/, '62')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center ml-20 md:ml-0 gap-2 bg-green-500 hover:bg-green-600 text-white text-xs md:text-sm font-medium px-3 py-2 rounded-md shadow-md"
            >
              <FaWhatsapp className="text-base" />
              Chat Seller
            </a>
          )}
        </div>

        {/* Deskripsi Toko */}
        <div className="text-gray-800">
          <h1 className="text-sm md:text-base font-medium">Deskripsi :</h1>
          <p className="text-xs md:text-sm">{store?.storeDescription}</p>
        </div>


      <div>
        <h2 className="text-xl font-semibold mb-4">Etalase Toko</h2>
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

    </div>
  );
};

export default StoreFrontPage;