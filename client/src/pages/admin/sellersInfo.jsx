import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSellers } from "@/store/admin/sellers-slice";
import { useNavigate } from "react-router-dom";

function SellersInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { sellers, isLoading, error } = useSelector((state) => state.sellersInfo);

  useEffect(() => {
    dispatch(fetchAllSellers());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manajemen Seller</h1>

      {isLoading ? (
        <p className="text-gray-600">Memuat data seller...</p>
      ) : error ? (
        <p className="text-red-500">Terjadi kesalahan: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Nama Toko</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Tanggal Bergabung</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {sellers?.length > 0 ? (
                sellers.map((seller) => (
                  <tr key={seller._id}>
                    <td className="p-2 border">{seller.storeName}</td>
                    <td className="p-2 border">{seller.email}</td>
                    <td className="p-2 border">Aktif</td>
                    <td className="p-2 border">
                      {new Date(seller.createdAt).toLocaleDateString("id-ID")}
                    </td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => navigate(`/admin/seller/${seller._id}`)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Lihat Profil
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    Belum ada seller terdaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SellersInfoPage;
