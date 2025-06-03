import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProfile } from "../../store/seller/profile-slice";

function SellerProfilePage() {
  const dispatch = useDispatch();
  const { profile: store, isLoading, error } = useSelector((state) => state.sellerProfile);

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  if (isLoading) return <p>Memuat data toko...</p>;
  if (error) return <p className="text-red-500">Gagal memuat data toko: {error}</p>;
  if (!store) return <p>Data toko tidak ditemukan.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Profil Toko</h2>
      <div className="flex gap-4 items-start">
        {store.logo && (
          <img
            src={store.logo}
            alt="Logo Toko"
            className="w-24 h-24 rounded border object-cover"
          />
        )}
        <div>
          <p><strong>Nama Toko:</strong> {store.storeName}</p>
          <p><strong>Deskripsi:</strong> {store.storeDescription}</p>
          <p><strong>Alamat Produksi:</strong> {store.productionAddress}</p>
          <p><strong>Nomor Telepon:</strong> {store.phoneNumber}</p>
          <p><strong>Rekening:</strong> {store.accountOwner} - {store.bankName} - {store.bankAccountNumber}</p>
          <p><strong>E-Wallet:</strong> {store.eWalletsAccountOwner} - {store.eWallet} - {store.eWalletAccountNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default SellerProfilePage;
