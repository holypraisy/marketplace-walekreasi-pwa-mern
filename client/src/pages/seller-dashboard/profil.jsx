import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";
import bannerUrl from "../../assets/banner-1.webp";
import { fetchSellerProfile, updateSellerProfile } from "../../store/seller/profile-slice";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { sellerProfileFormElements } from "@/config";

const SellerProfilePage = () => {
  const dispatch = useDispatch();
  const { profile: store, isLoading, error } = useSelector((state) => state.sellerProfile);

  const [openEditProfileSheet, setOpenEditProfileSheet] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  useEffect(() => {
    if (store) setFormData(store);
  }, [store]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSellerProfile(formData)).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchSellerProfile());
        setOpenEditProfileSheet(false);
      }
    });
  };

  const isFormValid = () =>
    Object.values(formData).filter((val, i) => i !== "id" && i !== "logo").every((v) => v !== "");

  if (isLoading) return <p>Memuat data toko...</p>;
  if (error) return <p className="text-red-500">Gagal memuat data toko: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="relative h-56 md:h-72 rounded-xl overflow-hidden shadow-md">
        <img src={bannerUrl} alt="Banner Toko" className="w-full h-full object-cover" />
        <img
          src={logoWaleKreasi}
          alt="Logo Toko"
          className="absolute bottom-4 left-4 w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg bg-white"
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <h2 className="text-3xl font-bold text-gray-800">Halo, {store.sellerName} 👋</h2>
        <Button onClick={() => setOpenEditProfileSheet(true)}>Edit Profil</Button>
      </div>

      {/* Informasi Profil */}
      <div className="grid md:grid-cols-3 gap-6 text-sm">
        {/* Data Diri */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold text-lg mb-2">🧍 Data Diri</h3>
          <p><strong>Nama Lengkap:</strong> {store.sellerName}</p>
          <p><strong>Nomor Telepon:</strong> {store.phoneNumber}</p>
          <p><strong>Alamat Domisili:</strong> {store.domicileAddress}</p>
          <p><strong>NIK:</strong> {store.nik}</p>
        </div>

        {/* Data Usaha */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold text-lg mb-2">🏪 Data Usaha</h3>
          <p><strong>Nama Toko:</strong> {store.storeName}</p>
          <p><strong>Deskripsi:</strong> {store.storeDescription}</p>
          <p><strong>Alamat Produksi:</strong> {store.productionAddress}</p>
        </div>

        {/* Data Pembayaran */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold text-lg mb-2">💳 Data Pembayaran</h3>
          <p><strong>Nama Pemilik Rekening:</strong> {store.bankAccountOwner}</p>
          <p><strong>Nama Bank:</strong> {store.bankName}</p>
          <p><strong>No Rekening:</strong> {store.bankAccountNumber}</p>
          <p><strong>Dompet Digital:</strong> {store.eWallet}</p>
          <p><strong>Pemilik E-Wallet:</strong> {store.eWalletsAccountOwner}</p>
          <p><strong>No E-Wallet:</strong> {store.eWalletAccountNumber}</p>
        </div>
      </div>

      {/* Sheet Edit Profil */}
      <Sheet
        open={openEditProfileSheet}
        onOpenChange={(open) => {
          setOpenEditProfileSheet(open);
          if (!open) setFormData(store);
        }}
      >
        <SheetContent side="right" className="overflow-auto w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Profil Toko</SheetTitle>
          </SheetHeader>
          <div className="py-6 text-black">
            <CommonForm
              onSubmit={handleSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText="Simpan"
              formControls={sellerProfileFormElements}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SellerProfilePage;
