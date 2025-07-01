import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendNotification,
  clearNotificationState,
} from "@/store/admin/notification-slice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import NotificationHistory from "@/components/admin/NotificationHistory";

function NotificationSetting() {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.sendNotification
  );

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSend = () => {
    if (!title || !body) {
      return alert("Judul dan isi notifikasi wajib diisi.");
    }

    dispatch(sendNotification({ title, body }));
  };

  // Reset form saat notifikasi berhasil dikirim
  useEffect(() => {
    if (message) {
      setTitle("");
      setBody("");
    }
  }, [message]);

  // Bersihkan state saat komponen di-unmount
  useEffect(() => {
    return () => {
      dispatch(clearNotificationState());
    };
  }, [dispatch]);

  return (
    <div className="bg-white border p-6 rounded shadow-sm max-w-xl">
      <h2 className="text-lg font-semibold mb-4">
        📣 Kirim Notifikasi ke Customer
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Judul</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Promo Terbatas Hari Ini"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Isi Pesan</label>
        <Textarea
          rows="4"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Contoh: Dapatkan diskon 20% hanya hari ini..."
        />
      </div>

      <Button onClick={handleSend} disabled={loading}>
        {loading ? "Mengirim..." : "Kirim Notifikasi"}
      </Button>

      {message && <p className="text-green-600 mt-4">{message}</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* ✅ Tampilkan riwayat notifikasi */}
      <NotificationHistory />
    </div>
  );
}

export default NotificationSetting;
