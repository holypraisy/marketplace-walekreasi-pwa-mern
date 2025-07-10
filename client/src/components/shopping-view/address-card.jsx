import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Pencil, Trash2 } from "lucide-react";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  const isSelected = selectedId?._id === addressInfo?._id;

  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`relative cursor-pointer transition rounded-md border ${
        isSelected ? "border-orange-500 bg-orange-50" : "border-gray-300"
      }`}
    >
      {isSelected && (
        <span className="absolute top-2 right-2 text-xs px-2 py-0.5 bg-green-100 text-green-600 rounded-full">
          ✔ Dipilih
        </span>
      )}

      <CardContent className="p-4 text-sm text-gray-800 space-y-1">
        <div className="font-semibold">{addressInfo?.receiverName} | {addressInfo?.phone}</div>
        <div>{addressInfo?.address}, {addressInfo?.city}</div>
        <div>Kode Pos: {addressInfo?.pincode}</div>
        {addressInfo?.notes && (
          <div className="text-gray-600 text-xs italic mt-1">
            Catatan: {addressInfo?.notes}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 flex justify-end gap-2">
        <Button
          size="icon"
          className="rounded-full bg-primary text-white hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation();
            handleEditAddress(addressInfo);
          }}
        >
          <Pencil className="w-4 h-4" />
        </Button>

        <Button
          size="icon"
          variant="destructive"
          className="rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteAddress(addressInfo);
          }}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
  