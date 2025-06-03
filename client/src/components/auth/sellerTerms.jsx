import { useState } from "react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "1. Kriteria Pendaftaran Seller",
    items: [
      "Warga Negara Indonesia (WNI).",
      "Berdomisili di Provinsi Sulawesi Utara.",
      "Memiliki usaha di bidang kerajinan lokal (seperti anyaman, ukiran, tenun, aksesori tradisional, dll).",
      "Memiliki produk yang diproduksi atau dibuat sendiri di wilayah Sulawesi Utara.",
    ],
  },
  {
    title: "2. Ketentuan Produk",
    items: [
      "Produk yang dijual harus asli buatan sendiri, bukan hasil repacking atau reseller barang dari luar daerah.",
      "Produk harus mencerminkan nilai budaya, kearifan lokal, dan keunikan Sulawesi Utara.",
      "Memiliki usaha di bidang kerajinan lokal (seperti anyaman, ukiran, tenun, aksesori tradisional, dll).",
      "Tidak diperbolehkan menjual produk yang melanggar hukum, atau mengandung unsur SARA/pornografi.",
    ],
  },
  {
    title: "3. Ketentuan Pengiriman dan Operasional",
    items: [
      "Seller bertanggung jawab atas pengemasan, pengiriman, dan kualitas produk.",
      "Seller diharapkan menjawab pertanyaan pembeli secara responsif.",
    ],
  },
  {
    title: "4. Akurasi dan Kebenaran Data",
    items: [
      "Calon seller bertanggung jawab penuh atas kebenaran data yang diberikan.",
      "Pihak Marketplace Wale Kreasi berhak menolak, menangguhkan, atau menonaktifkan akun seller jika ditemukan data palsu atau tidak sesuai kriteria.",
    ],
  },
  {
    title: "5. Hak Marketplace Wale Kreasi",
    items: [
      "Pihak marketplace berhak melakukan verifikasi dan kurasi terhadap setiap produk yang didaftarkan.",
      "Pihak marketplace dapat sewaktu-waktu mengubah ketentuan ini tanpa pemberitahuan terlebih dahulu.",
      "Pihak marketplace berhak menonaktifkan akun seller yang melanggar ketentuan atau menerima banyak laporan negatif dari pembeli.",
    ],
  },
  {
    title: "6. Persetujuan",
    paragraph: "Dengan mendaftar sebagai seller, Anda dianggap telah:",
    items: [
      "Membaca, memahami, dan menyetujui seluruh syarat dan ketentuan di atas.",
      "Bersedia tunduk pada peraturan marketplace dan menjalankan usaha secara profesional dan jujur.",
    ],
  },
];

export default function TermsSection({ onAgree }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 px-4 md:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold text-center">Syarat & Ketentuan Pendaftaran Seller</h1>

      <div className="space-y-6 text-foreground max-h-96 overflow-y-auto text-justify text-sm">
        <p>
          Terima kasih telah berminat untuk menjadi Seller di platform kami. Dengan mendaftar sebagai Seller, Anda
          menyetujui semua syarat dan ketentuan yang berlaku berikut ini:
        </p>

        {sections.map((section, idx) => (
          <div key={idx}>
            <h2 className="font-bold text-base">{section.title}</h2>
            {section.paragraph && <p>{section.paragraph}</p>}
            <ul className="list-disc list-inside space-y-2 ml-4">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="agree" className="text-sm text-gray-800">
          Saya sudah membaca dan bersedia memenuhi syarat & ketentuan yang berlaku.
        </label>
      </div>

      <div className="text-center">
        <Button onClick={onAgree} disabled={!agreed}>
          Lanjut Mendaftar
        </Button>
      </div>
    </div>
  );
}
