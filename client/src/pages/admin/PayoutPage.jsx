import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUnpaidOrders,
  markOrdersAsPaid,
} from "../../store/admin/payout-slice";

const PayoutPage = () => {
  const dispatch = useDispatch();
  const { unpaidOrders, loading, error } = useSelector((state) => state.payout);

  useEffect(() => {
    dispatch(fetchUnpaidOrders());
  }, [dispatch]);

  const handlePaySeller = (sellerId) => {
    if (window.confirm("Yakin ingin menandai pembayaran ke seller ini sebagai selesai?")) {
      dispatch(markOrdersAsPaid(sellerId)).then(() => {
        dispatch(fetchUnpaidOrders());
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Pembayaran ke Seller</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && unpaidOrders && Object.keys(unpaidOrders).length === 0 && (
        <p>Tidak ada pesanan yang menunggu pembayaran ke seller.</p>
      )}

      {unpaidOrders &&
        Object.entries(unpaidOrders).map(([sellerId, orders]) => (
          <div key={sellerId} className="border rounded p-4 mb-4">
            <h2 className="text-lg font-medium">Seller ID: {sellerId}</h2>
            <p>Jumlah Pesanan: {orders.length}</p>
            <ul className="list-disc pl-5">
              {orders.map((order) => (
                <li key={order._id}>
                  Order ID: <span className="font-mono">{order._id}</span> - Total: Rp{order.totalAmount.toLocaleString("id-ID")}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handlePaySeller(sellerId)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Tandai Telah Dibayar ke Seller
            </button>
          </div>
        ))}
    </div>
  );
};

export default PayoutPage;
