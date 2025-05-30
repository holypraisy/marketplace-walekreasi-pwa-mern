import { useEffect, useState } from "react";
import axios from "axios";

function SellerProfilePage() {
  const [store, setStore] = useState(null);

  useEffect(() => {
    async function fetchStore() {
      try {
        const res = await axios.get("/api/seller/store-profile");
        setStore(res.data.store);
      } catch (error) {
        console.error("Gagal mengambil data toko", error);
      }
    }
    fetchStore();
  }, []);

  if (!store) return <p>Memuat data toko...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-bold">Profil Toko</h2>
      <div className="flex gap-4 items-start">
        <img src={store.logo} alt="Logo Toko" className="w-24 h-24 rounded border" />
        <div>
          <p><strong>Nama Toko:</strong> {store.name}</p>
          <p><strong>Deskripsi:</strong> {store.description}</p>
          <p><strong>Alamat Produksi:</strong> {store.address}</p>
          <p><strong>Nomor Telepon</strong> {store.phoneNumber}</p>
          <p><strong>Rekening:</strong> {store.accountOwner} - {store.bankName} - {store.bankAccountNumber}</p>
          <p><strong>E-Wallet:</strong> {store.eWallets.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}

export default SellerProfilePage;
