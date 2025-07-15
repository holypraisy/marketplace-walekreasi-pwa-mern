import { useState } from "react";
import TermsSection from "../../components/auth/sellerTerms";
import AuthRegisterSeller from "../../components/auth/sellerRegisterForm";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";

export default function RegisterSeller() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col lg:flex-row">
      {/* Kolom Kiri */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-primary items-center justify-center p-10">
        <div className="text-center max-w-sm">
          <img
            src={logoWaleKreasi}
            alt="Wale Kreasi"
            className="h-32 w-32 mb-6 bg-white rounded-full p-4 mx-auto"
          />
          <h2 className="text-2xl font-bold text-white mb-2">
            Buka Toko di WaleKreasi
          </h2>
          <p className="text-white font-light leading-relaxed">
            Jadilah bagian dari ekosistem ekonomi kreatif Sulawesi Utara!
          </p>
        </div>
      </div>

      {/* Kolom Kanan */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-3xl">
          {agreed ? (
            <AuthRegisterSeller />
          ) : (
            <div className="max-h-[85vh] overflow-y-auto pr-2">
              <TermsSection onAgree={() => setAgreed(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
