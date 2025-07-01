import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotificationHistory,
  clearNotificationHistory,
} from "@/store/admin/notification-slice";
import { Button } from "@/components/ui/button";

function NotificationHistory() {
  const dispatch = useDispatch();
  const {
    history = [], // fallback aman
    loadingHistory,
    error,
  } = useSelector((state) => state.sendNotification);

  // Ambil riwayat saat komponen dimuat
  useEffect(() => {
    dispatch(fetchNotificationHistory());
  }, [dispatch]);

  const handleClear = () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua riwayat notifikasi?")) {
      dispatch(clearNotificationHistory());
    }
  };

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-semibold">📜 Riwayat Notifikasi</h3>
        <Button
          variant="destructive"
          onClick={handleClear}
          disabled={loadingHistory}
        >
          {loadingHistory ? "Menghapus..." : "Hapus Riwayat"}
        </Button>
      </div>

      {loadingHistory && (
        <p className="text-sm text-gray-500">Memuat riwayat...</p>
      )}

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      {Array.isArray(history) && history.length === 0 && !loadingHistory ? (
        <p className="text-sm text-gray-500 italic">
          Belum ada riwayat notifikasi.
        </p>
      ) : (
        <ul className="space-y-2 text-sm">
          {history.map((item) => (
            <li key={item._id} className="border rounded p-3 bg-white">
              <div className="font-medium">{item.title}</div>
              <div className="text-gray-700">{item.body}</div>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(item.createdAt).toLocaleString("id-ID", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationHistory;
