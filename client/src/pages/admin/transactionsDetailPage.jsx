import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchTransactionById,
  clearSelectedTransaction,
} from "@/store/admin/trasactions-slice";
import { ArrowLeft } from "lucide-react";

function TransactionDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedTransaction, isLoading, error } = useSelector((state) => state.transactionsInfo);

  useEffect(() => {
    dispatch(fetchTransactionById(id));
    return () => dispatch(clearSelectedTransaction()); // bersihkan saat unmount
  }, [dispatch, id]);

  if (isLoading) return <p className="p-4">Memuat detail transaksi...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
  if (!selectedTransaction) return null;

  const {
    _id,
    customerName,
    customerEmail,
    sellerId,
    orderDate,
    orderStatus,
    paymentStatus,
    totalAmount,
    addressInfo,
    cartItems,
  } = selectedTransaction;

  return (
    <div className="p-4 space-y-4">
      {/* <Link to="/admin/transactions" className="text-blue-500 underline">&larr; Kembali ke daftar</Link> */}

        <Link
            to="/admin/transactions"
            className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md shadow-sm transition"
        >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke daftar
        </Link>

      <h1 className="text-2xl font-bold">Detail Transaksi</h1>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <p><strong>ID Order:</strong> {_id}</p>
        <p><strong>Tanggal Order:</strong> {new Date(orderDate).toLocaleString()}</p>
        <p><strong>Status Order:</strong> {orderStatus}</p>
        <p><strong>Status Pembayaran:</strong> {paymentStatus}</p>
        <p><strong>Total Bayar:</strong> Rp {totalAmount.toLocaleString()}</p>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-lg font-semibold">Customer</h2>
        <p>{customerName} ({customerEmail})</p>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-lg font-semibold">Seller</h2>
        <p>{sellerId?.storeName || "Tidak diketahui"} ({sellerId?.email})</p>
      </div>

      <div className="bg-white p-4 rounded shadow space-y-2">
        <h2 className="text-lg font-semibold">Alamat Pengiriman</h2>
        <p>{addressInfo.address}, {addressInfo.city}, {addressInfo.pincode}</p>
        <p>Telepon: {addressInfo.phone}</p>
        <p>Catatan: {addressInfo.notes}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Produk yang Dibeli</h2>
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Nama Produk</th>
              <th className="p-2 border">Jumlah</th>
              <th className="p-2 border">Harga</th>
              <th className="p-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border">{item.quantity}</td>
                <td className="p-2 border">Rp {parseInt(item.price).toLocaleString()}</td>
                <td className="p-2 border">Rp {(parseInt(item.price) * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionDetailPage;
