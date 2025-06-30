// src/firebase/firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDlFbYAlvMT2NBwY230lEckzArq70SuPJo",
  authDomain: "marketplace-walekreasi-pwa.firebaseapp.com",
  projectId: "marketplace-walekreasi-pwa",
  storageBucket: "marketplace-walekreasi-pwa.appspot.com",
  messagingSenderId: "383065971850",
  appId: "1:383065971850:web:44ad6ea6ea376be266a173",
  measurementId: "G-B65GWXF3DR"
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Dapatkan instance messaging
const messaging = getMessaging(app);

// Minta token FCM dari user
const requestForToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BF1azTsD0hTD93ilVDdP7sqhDFgKIwY1E3l2AhyH6Vn-RxSGquZ71kHAMGTyRxLHoV3hOZI6Ylh6Xyij_nI04pQ",
    });

    if (currentToken) {
      console.log("✅ FCM Token:", currentToken);
      // Kirim ke backend jika diperlukan
      await fetch("http://localhost:5000/api/common/notification/save-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fcmToken: currentToken }),
      });
    } else {
      console.warn("⚠️ Tidak ada token tersedia. Izin belum diberikan.");
    }
  } catch (err) {
    console.error("❌ Gagal mendapatkan token FCM:", err);
  }
};

// Listener notifikasi saat app di foreground
const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("📩 Notifikasi diterima (foreground):", payload);
      resolve(payload);
    });
  });

export { messaging, requestForToken, onMessageListener };
