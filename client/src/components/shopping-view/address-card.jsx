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
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer transition border ${
        selectedId?._id === addressInfo?._id
          ? "border-primary border-[2px]"
          : "border-gray-300"
      }`}
    >
      <CardContent className="p-4 space-y-2 text-sm text-gray-700">
        <div className="flex flex-col gap-y-2">
          <div>
            <p className="text-gray-500">Nama Penerima : </p>
            <p className="font-medium">{addressInfo?.receiverName}</p>
          </div>

          <div>
            <p className="text-gray-500">Nomor Telepon : </p>
            <p className="font-medium">{addressInfo?.phone}</p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-gray-500">Alamat :</p>
            <p className="font-medium">{addressInfo?.address}</p>
          </div>

          <div>
            <p className="text-gray-500">Kota/Kabupaten :</p>
            <p className="font-medium">{addressInfo?.city}</p>
          </div>

          <div>
            <p className="text-gray-500">Kode Pos :</p>
            <p className="font-medium">{addressInfo?.pincode}</p>
          </div>

          {addressInfo?.notes && (
            <div className="sm:col-span-2">
              <p className="text-gray-500">Catatan :</p>
              <p className="font-medium">{addressInfo?.notes}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 flex justify-end gap-2">
        <Button
          size="icon"
          className="rounded-full bg-primary text-white hover:bg-primary/90"
          onClick={(e) => {
            e.stopPropagation(); // Hindari select saat klik edit
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
            e.stopPropagation(); // Hindari select saat klik hapus
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
