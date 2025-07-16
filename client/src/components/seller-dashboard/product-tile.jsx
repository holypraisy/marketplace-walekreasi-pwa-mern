import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function SellerProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-md rounded-xl overflow-hidden">
      {/* Gambar */}
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-48 sm:h-56 object-cover"
        />
      </div>

      {/* Konten */}
      <CardContent className="p-3">
        <h2 className="text-base sm:text-lg font-semibold mb-1 truncate">
          {product?.title}
        </h2>

        <div className="flex justify-between items-center">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through text-gray-500" : "text-primary"
            } text-sm sm:text-base font-medium`}
          >
            Rp{parseInt(product?.price).toLocaleString("id-ID")}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-sm sm:text-base font-bold text-red-600">
              Rp{parseInt(product?.salePrice).toLocaleString("id-ID")}
            </span>
          )}
        </div>
      </CardContent>

      {/* Aksi */}
      <CardFooter className="flex justify-between items-center px-3 pb-3">
        <Button
          size="icon"
          variant="secondary"
          onClick={() => {
            setOpenCreateProductsDialog(true);
            setCurrentEditedId(product?._id);
            setFormData(product);
          }}
        >
          <SquarePen className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="destructive"
          onClick={() => handleDelete(product?._id)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default SellerProductTile;
