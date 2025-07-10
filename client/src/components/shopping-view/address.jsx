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
} from "../ui/dialog";
import { CirclePlus } from "lucide-react";

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
  const [openFormDialog, setOpenFormDialog] = useState(false);
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

  const handleManageAddress = (e) => {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      toast({
        title: "Anda dapat menambahkan maksimal 3 alamat.",
        variant: "destructive",
      });
      return;
    }

    const action = currentEditedId !== null
      ? editaAddress({ userId: user?.id, addressId: currentEditedId, formData })
      : addNewAddress({ ...formData, userId: user?.id });

    dispatch(action).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        setFormData(initialAddressFormData);
        setCurrentEditedId(null);
        toast({
          title: currentEditedId ? "Alamat diperbarui" : "Alamat ditambahkan",
        });
        setOpenFormDialog(false);
      }
    });
  };

  const handleDeleteAddress = (address) => {
    dispatch(deleteAddress({ userId: user?.id, addressId: address._id }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          toast({ title: "Alamat berhasil dihapus." });
        }
      });
  };

  const handleEditAddress = (address) => {
    setFormData({
      receiverName: address.receiverName,
      address: address.address,
      city: address.city,
      phone: address.phone,
      pincode: address.pincode,
      notes: address.notes,
    });
    setCurrentEditedId(address._id);
    setOpenFormDialog(true);
  };

  const isFormValid = () =>
    Object.values(formData).every((val) => (val || "").trim() !== "");

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center px-4 pt-4">
        <CardTitle className="text-base md:text-xl font-semibold text-primary">
          Alamat Pengiriman
        </CardTitle>
        <Button
          size="sm"
          className="flex gap-1 items-center bg-primary text-white"
          onClick={handleOpenAddForm}
        >
          <CirclePlus className="w-4 h-4" />
          Tambah Alamat
        </Button>
      </CardHeader>

      <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {addressList.map((addressItem) => (
          <AddressCard
            key={addressItem._id}
            selectedId={selectedId}
            handleDeleteAddress={handleDeleteAddress}
            handleEditAddress={handleEditAddress}
            addressInfo={addressItem}
            setCurrentSelectedAddress={setCurrentSelectedAddress}
          />
        ))}
      </CardContent>

      <Dialog open={openFormDialog} onOpenChange={setOpenFormDialog}>
        <DialogContent className="max-w-full md:max-w-screen-md max-h-lvh overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentEditedId ? "Ubah Alamat" : "Tambah Alamat"}
            </DialogTitle>
          </DialogHeader>
          <CommonForm
            formControls={addressFormControls}
            formData={formData}
            setFormData={setFormData}
            buttonText={currentEditedId ? "Ubah" : "Tambah"}
            onSubmit={handleManageAddress}
            isBtnDisabled={!isFormValid()}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default Address;
