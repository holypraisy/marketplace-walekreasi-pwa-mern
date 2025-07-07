import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editaAddress,
  fetchAllAddresses,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CirclePlus, Pencil, Trash2 } from "lucide-react";

const initialAddressFormData = {
  receiverName: "",
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address({ setCurrentSelectedAddress, selectedId }) {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [openFormDialog, setOpenFormDialog] = useState(false); // 👈 kontrol dialog
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  const handleOpenAddForm = () => {
    setCurrentEditedId(null);
    setFormData(initialAddressFormData);
    setOpenFormDialog(true);
  };

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      toast({
        title: "Anda dapat menambahkan maksimal 3 alamat.",
        variant: "destructive",
      });
      return;
    }

    const action = currentEditedId !== null
      ? editaAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        })
      : addNewAddress({
          ...formData,
          userId: user?.id,
        });

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setFormData(initialAddressFormData);
        setCurrentEditedId(null);
        toast({
          title: currentEditedId ? "Alamat diperbarui" : "Alamat ditambahkan",
        });
        setOpenFormDialog(false); // Tutup dialog
      }
    });
  }

  function handleDeleteAddress(address) {
    dispatch(deleteAddress({ userId: user?.id, addressId: address._id }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          toast({ title: "Alamat Berhasil Dihapus" });
        }
      });
  }

  function handleEditAddress(address) {
    setFormData({
      receiverName: address?.receiverName,
      address: address?.address,
      city: address?.city,
      phone: address?.phone,
      pincode: address?.pincode,
      notes: address?.notes,
    });
    setCurrentEditedId(address?._id);
    setOpenFormDialog(true);
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => (formData[key] || "").trim() !== "")
      .every((item) => item);
  }

  return (
    <Card className="px-2">
      {/* Header */}
      <CardHeader className="flex">
        <CardTitle className="text-lg md:text-xl font-semibold text-primary">Daftar Alamat</CardTitle>
        <Button className="bg-primary text-white w-fit" 
                onClick={handleOpenAddForm}>
          <CirclePlus className="mr-3"/>
          Tambah Alamat
        </Button>
      </CardHeader>

      {/* Daftar Alamat */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addressList?.map((addressItem) => (
          <AddressCard
            key={addressItem._id}
            selectedId={selectedId}
            handleDeleteAddress={handleDeleteAddress}
            handleEditAddress={handleEditAddress}
            addressInfo={addressItem}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        ))}
      </div>

      {/* Form Tambah/Ubah dalam Dialog */}
      <Dialog open={openFormDialog} onOpenChange={setOpenFormDialog}>
        <DialogContent className="max-w-full md:max-w-screen-md max-h-lvh md:max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentEditedId !== null ? "Ubah Alamat" : "Tambah Alamat"}
            </DialogTitle>
          </DialogHeader>

          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId !== null ? "Ubah" : "Tambah"}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default Address;
