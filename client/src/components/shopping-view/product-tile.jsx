import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { categoryOptionsMap } from "@/config";

function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
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
                  Rp.{product?.price}
                </span>
                <span>Rp.{product?.salePrice}</span>
              </>
            ) : (
              <span>Rp.{product?.price}</span>
            )}
          </div>

          {/* ⭐ Rating */}
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Star className="fill-yellow-400 stroke-yellow-400 w-4 h-4" />
            <span>{(product?.rating || 0.0).toFixed(1)}</span>
            {product?.totalReview && (
              <span className="text-gray-400 ml-1">
                | {product?.totalReview} ulasan
              </span>
            )}
          </div>
        </CardContent>
      </div>

      <CardFooter className="px-3 pb-3 pt-0 flex justify-end">
        {product?.totalStock > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // supaya tidak trigger handleGetProductDetails
              handleAddtoCart(product?._id, product?.totalStock);
            }}
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
