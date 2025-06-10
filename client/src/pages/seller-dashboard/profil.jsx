import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";
import bannerUrl from "../../assets/banner-1.webp";
import { fetchSellerProfile, updateSellerProfile } from "../../store/seller/profile-slice";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { sellerProfileFormElements } from "@/config";
import { CreditCard, SquarePen, Store, UserCircle } from "lucide-react";

const SellerProfilePage = () => {
  const dispatch = useDispatch();
  const { profile: store, isLoading, error } = useSelector((state) => state.sellerProfile);

  const [openEditProfileSheet, setOpenEditProfileSheet] = useState(false);
  const [formData, setFormData] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (store) setFormData(store);
  }, [store]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (logoFile) form.append("logo", logoFile);
    if (bannerFile) form.append("banner", bannerFile);

    dispatch(updateSellerProfile(form)).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchSellerProfile());
        setOpenEditProfileSheet(false);
        setLogoFile(null);
        setBannerFile(null);
      }
    });
  };

  const isFormValid = () =>
    Object.entries(formData)
      .filter(([key]) => key !== "id" && key !== "logo")
      .every(([, val]) => val !== "");

  if (isLoading || !store) return <p>Memuat data toko...</p>;
  if (error) return <p className="text-red-500">Gagal memuat data toko: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="relative h-56 md:h-72 rounded-xl overflow-hidden shadow-md">
        <img
          src={store.storeBannerUrl || bannerUrl}
          alt="Banner Toko"
          className="w-full h-full object-cover"
        />
        <img
          src={store.storeLogoUrl || logoWaleKreasi}
          alt="Logo Toko"
          className="absolute bottom-4 left-4 w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg bg-white"
        />
      </div>

      <div className="flex justify-end items-center mt-4">
        <Button
          onClick={() => setOpenEditProfileSheet(true)}
          className="items-center gap-2"
        >
          <SquarePen /> Edit Profil
        </Button>
      </div>

      {/* Informasi Profil */}
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        {/* Data Diri */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex gap-4 items-center border-b-2 py-1 ">
            <UserCircle />
            <h1 className="font-semibold text-lg">Data Diri Penjual</h1>
          </div>
          <div className="grid gap-4 mt-4">
            <p className="flex flex-col font-light">Nama Lengkap: <span className="text-base font-medium">{store.sellerName}</span></p>
            <p className="flex flex-col font-light">Nomor Telepon: <span className="text-base font-medium">{store.phoneNumber}</span></p>
            <p className="flex flex-col font-light">Alamat Domisili: <span className="text-base font-medium">{store.domicileAddress}</span></p>
            <p className="flex flex-col font-light">NIK: <span className="text-base font-medium">{store.nik}</span></p>
          </div>
        </div>

        {/* Data Usaha */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex gap-4 items-center border-b-2 py-1 ">
            <Store />
            <h1 className="font-semibold text-lg">Data Usaha/Toko</h1>
          </div>
          <div className="grid gap-4 mt-4">
            <p className="flex flex-col font-light">Nama Toko: <span className="text-base font-medium">{store.storeName}</span></p>
            <p className="flex flex-col font-light">Deskripsi: <span className="text-base font-medium">{store.storeDescription}</span></p>
            <p className="flex flex-col font-light">Alamat Produksi: <span className="text-base font-medium">{store.productionAddress}</span></p>
          </div>
        </div>

        {/* Data Pembayaran */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex gap-4 items-center border-b-2 py-1 ">
            <CreditCard />
            <h1 className="font-semibold text-lg">Data Pembayaran</h1>
          </div>
          <div className="grid gap-4 mt-4">
            <p className="flex flex-col font-light">Nama Pemilik Rekening: <span className="text-base font-medium">{store.bankAccountOwner}</span></p>
            <p className="flex flex-col font-light">Nama Bank: <span className="text-base font-medium">{store.bankName}</span></p>
            <p className="flex flex-col font-light">Nomor Rekening: <span className="text-base font-medium">{store.bankAccountNumber}</span></p>
            <p className="flex flex-col font-light">Dompet Digital (e-Wallet): <span className="text-base font-medium">{store.eWallet}</span></p>
            <p className="flex flex-col font-light">Pemilik E-Wallet: <span className="text-base font-medium">{store.eWalletsAccountOwner}</span></p>
            <p className="flex flex-col font-light">Nomor E-Wallet: <span className="text-base font-medium">{store.eWalletAccountNumber}</span></p>
          </div>
        </div>
      </div>

      {/* Sheet Edit Profil */}
      <Sheet
        open={openEditProfileSheet}
        onOpenChange={(open) => {
          setOpenEditProfileSheet(open);
          if (!open) {
            setFormData(store);
            setLogoFile(null);
            setBannerFile(null);
          }
        }}
      >
        <SheetContent side="right" className="overflow-auto w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Profil Toko</SheetTitle>
          </SheetHeader>
          <div className="py-6 text-black space-y-4">
            <CommonForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Simpan"
              formControls={sellerProfileFormElements}
              isBtnDisabled={!isFormValid()}
            />
            <div className="space-y-4 px-2">
              <div>
                <label className="block font-medium mb-1">Upload Logo Toko</label>
                <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />
              </div>
              <div>
                <label className="block font-medium mb-1">Upload Banner Toko</label>
                <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files[0])} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SellerProfilePage;
