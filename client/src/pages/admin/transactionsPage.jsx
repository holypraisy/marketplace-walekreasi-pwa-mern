import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTransactions } from "@/store/admin/trasactions-slice";
import { useNavigate } from "react-router-dom";

function TransactionsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { transactions, isLoading, error } = useSelector(
    (state) => state.transactionsInfo
  );

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manajemen Transaksi</h1>

      {isLoading ? (
        <p>Memuat data transaksi...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID Order</th>
                <th className="p-2 border">Tanggal</th>
                <th className="p-2 border">Toko</th>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx) => (
                <tr key={trx._id}>
                  <td className="p-2 border">{trx._id}</td>
                  <td className="p-2 border">
                    {new Date(trx.orderDate).toLocaleDateString()}
                  </td>
                    <td className="p-2 border">
                    {trx.sellerId?.storeName || "-"}
                    </td>
                    <td className="p-2 border">
                    {trx.customerName || "-"}
                    </td>
                  <td className="p-2 border">{trx.orderStatus}</td>
                  <td className="p-2 border text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/transactions/${trx._id}`)
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Belum ada transaksi.
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

export default TransactionsPage;
