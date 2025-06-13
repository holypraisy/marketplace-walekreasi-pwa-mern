import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import addPhotoIcon from "../../assets/addPhotoIcon.png";
import {
  fetchSellerProfile,
  updateSellerProfile,
  uploadStoreImage,
} from "../../store/seller/profile-slice";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CommonForm from "@/components/common/form";
import { sellerProfileFormElements } from "@/config";
import { CreditCard, SquarePen, Store, UserCircle } from "lucide-react";

const SellerProfilePage = () => {
  const dispatch = useDispatch();
  const { profile: store, isLoading, error } = useSelector(
    (state) => state.sellerProfile
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedData = { ...formData };

    if (logoFile) {
      const logoUrl = await dispatch(uploadStoreImage(logoFile)).unwrap();
      updatedData.storeLogoUrl = logoUrl;
    }

    if (bannerFile) {
      const bannerUrl = await dispatch(uploadStoreImage(bannerFile)).unwrap();
      updatedData.storeBannerUrl = bannerUrl;
    }

    dispatch(updateSellerProfile(updatedData)).then((res) => {
      if (res?.payload) {
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
      <div className="relative w-full rounded-xl overflow-hidden shadow-md aspect-[16/5] bg-gray-100">
        <img
          src={store.storeBannerUrl || addPhotoIcon}
          alt="Banner Toko"
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-4 left-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg z-10">
          <img
            src={store.storeLogoUrl || addPhotoIcon}
            alt="Logo Toko"
            className="w-full h-full object-cover"
          />
        </div>
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
            <p className="flex flex-col font-light">
              Nama Lengkap: <span className="text-base font-medium">{store.sellerName}</span>
            </p>
            <p className="flex flex-col font-light">
              Nomor Telepon: <span className="text-base font-medium">{store.phoneNumber}</span>
            </p>
            <p className="flex flex-col font-light">
              Alamat Domisili: <span className="text-base font-medium">{store.domicileAddress}</span>
            </p>
            <p className="flex flex-col font-light">
              NIK: <span className="text-base font-medium">{store.nik}</span>
            </p>
          </div>
        </div>

        {/* Data Usaha */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex gap-4 items-center border-b-2 py-1 ">
            <Store />
            <h1 className="font-semibold text-lg">Data Usaha/Toko</h1>
          </div>
          <div className="grid gap-4 mt-4">
            <p className="flex flex-col font-light">
              Nama Toko: <span className="text-base font-medium">{store.storeName}</span>
            </p>
            <p className="flex flex-col font-light">
              Deskripsi: <span className="text-base font-medium">{store.storeDescription}</span>
            </p>
            <p className="flex flex-col font-light">
              Alamat Produksi: <span className="text-base font-medium">{store.productionAddress}</span>
            </p>
          </div>
        </div>

        {/* Data Pembayaran */}
        <div className="bg-white shadow rounded-xl p-4">
          <div className="flex gap-4 items-center border-b-2 py-1 ">
            <CreditCard />
            <h1 className="font-semibold text-lg">Data Pembayaran</h1>
          </div>
          <div className="grid gap-4 mt-4">
            <p className="flex flex-col font-light">
              Nama Pemilik Rekening: <span className="text-base font-medium">{store.bankAccountOwner}</span>
            </p>
            <p className="flex flex-col font-light">
              Nama Bank: <span className="text-base font-medium">{store.bankName}</span>
            </p>
            <p className="flex flex-col font-light">
              Nomor Rekening: <span className="text-base font-medium">{store.bankAccountNumber}</span>
            </p>
            <p className="flex flex-col font-light">
              Dompet Digital (e-Wallet): <span className="text-base font-medium">{store.eWallet}</span>
            </p>
            <p className="flex flex-col font-light">
              Pemilik E-Wallet: <span className="text-base font-medium">{store.eWalletsAccountOwner}</span>
            </p>
            <p className="flex flex-col font-light">
              Nomor E-Wallet: <span className="text-base font-medium">{store.eWalletAccountNumber}</span>
            </p>
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
        <SheetContent side="right" className="overflow-auto w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle>Edit Profil Toko</SheetTitle>
          </SheetHeader>

          <div className="flex-1 py-6 text-black space-y-4">
            {/* Pesan Himbauan */}
            {(!store.storeLogoUrl || !store.storeBannerUrl) && (
              <div className="bg-yellow-100 text-yellow-800 border border-yellow-300 p-3 rounded-md text-sm">
                ⚠️ Lengkapi profil toko Anda dengan <strong>mengunggah logo dan banner toko</strong> untuk meningkatkan kepercayaan pembeli.
              </div>
            )}
            {/* Upload Gambar */}
            <div className="space-y-4 px-2">
              <div>
                <label className="block font-medium mb-1">Unggah/Ganti Logo Toko</label>
                <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />
              </div>
              <div>
                <label className="block font-medium mb-1">Unggah/Ganti Banner Toko</label>
                <input type="file" accept="image/*" onChange={(e) => setBannerFile(e.target.files[0])} />
              </div>
            </div> 
            {/* Form Input Teks */}
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
