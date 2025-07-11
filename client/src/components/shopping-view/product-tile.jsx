import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { categoryOptionsMap } from "@/config";
import { toast } from "../ui/use-toast";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  const averageReview = product?.averageReview || 0;
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleCartClick = (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      // Belum login → redirect ke login
      return navigate("/auth/login", {
        state: { from: { pathname: location.pathname } },
      });
    }

    if (user?.role !== "customer") {
      // Bukan customer → tampilkan toast/error
      return toast({
        title: "Akses ditolak",
        description: "Hanya pelanggan yang dapat menambahkan ke keranjang.",
        variant: "destructive",
      });
    }

    // ✅ Tambahkan ke keranjang
    handleAddtoCart(product?._id, product?.totalStock);
  };

  return (
    <Card className="w-full max-w-[220px] mx-auto group overflow-hidden relative">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="cursor-pointer"
      >
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-32 md:h-40 object-cover"
          />

          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 text-xs">
              Stok Habis
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 text-xs">
              Sisa {product?.totalStock}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 text-xs">Promo</Badge>
          ) : null}
        </div>

        <CardContent className="px-3 py-2">
          <h2 className="text-sm font-semibold truncate">{product?.title}</h2>
          <p className="text-xs text-muted-foreground truncate">
            {categoryOptionsMap[product?.category]}
          </p>

          {/* Harga */}
          <div className="flex flex-wrap items-center gap-1 text-sm mt-1 font-bold text-foreground">
            {product?.salePrice > 0 ? (
              <>
                <span className="line-through text-muted-foreground">
                  Rp.{product?.price?.toLocaleString("id-ID")}
                </span>
                <span>Rp.{product?.salePrice?.toLocaleString("id-ID")}</span>
              </>
            ) : (
              <span>Rp.{product?.price?.toLocaleString("id-ID")}</span>
            )}
          </div>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Star className="fill-yellow-400 stroke-yellow-400 w-4 h-4" />
            <span>{averageReview.toFixed(1)}</span>
          </div>
        </CardContent>
      </div>

      <CardFooter className="px-3 pb-3 pt-0 flex justify-end">
        {product?.totalStock > 0 && (
          <button
            onClick={handleCartClick}
            className="bg-primary hover:bg-primary/90 text-white rounded-full p-2 flex items-center justify-center"
            title="Tambah ke Keranjang"
          >
            <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ShoppingProductTile;
