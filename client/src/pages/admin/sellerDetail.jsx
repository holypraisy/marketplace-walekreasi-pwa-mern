import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchSellerById } from "@/store/admin/sellers-slice";
import { ArrowLeft } from "lucide-react";

function SellerDetailPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedSeller, isLoading, error } = useSelector(
    (state) => state.sellersInfo
  );

  useEffect(() => {
    dispatch(fetchSellerById(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Memuat profil seller...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!selectedSeller) return <p>Data seller tidak ditemukan.</p>;

  const s = selectedSeller;

  return (
    <div className="p-4">
      <Link
        to="/admin/sellers"
        className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md shadow-sm transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke daftar
        </Link>

      <h1 className="text-2xl font-bold mb-4">Detail Seller</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p><strong>Nama Toko:</strong> {s.storeName}</p>
        <p><strong>Nama Seller:</strong> {s.sellerName}</p>
        <p><strong>Email:</strong> {s.email}</p>
        <p><strong>No. HP:</strong> {s.phoneNumber}</p>
        <p><strong>NIK:</strong> {s.nik}</p>
        <p><strong>Alamat Domisili:</strong> {s.domicileAddress}</p>
        <p><strong>Alamat Produksi:</strong> {s.productionAddress}</p>
        <p><strong>Nama Bank:</strong> {s.bankName}</p>
        <p><strong>Nomor Rekening:</strong> {s.bankAccountNumber}</p>
        <p><strong>Nama Pemilik Rekening:</strong> {s.bankAccountOwner}</p>
        <p><strong>E-wallet:</strong> {s.eWallet}</p>
        <p><strong>Nomor E-wallet:</strong> {s.eWalletAccountNumber}</p>
        <p><strong>Tanggal Bergabung:</strong> {new Date(s.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default SellerDetailPage;
