import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

function AddressSelected({ selectedAddress, onChoose }) {
  return (
    <Card className="p-4 border border-gray-200 bg-white rounded-md">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <MapPin className="text-gray-600 mt-1" />
          <div className="text-sm  text-gray-700">
            {selectedAddress ? (
              <>
                <div className="font-semibold">
                  {selectedAddress.receiverName} | {selectedAddress.phone}
                </div>
                <div>{selectedAddress.address}, {selectedAddress.city}</div>
                <div>Kode Pos: {selectedAddress.pincode}</div>
                {selectedAddress.notes && (
                  <div className="text-xs text-gray-500 italic mt-1">
                    Catatan: {selectedAddress.notes}
                  </div>
                )}
              </>
            ) : (
              <div className="mt-1 text-red-600">Mohon pilih alamat pengiriman</div>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-gray-700 border-gray-300"
          onClick={onChoose}
        >
          {selectedAddress ? "Ganti" : "Pilih"}
        </Button>
      </div>
    </Card>
  );
}

export default AddressSelected;
