import { useState } from "react";
import TermsSection from "../../components/auth/sellerTerms";
import AuthRegisterSeller from "../../components/auth/sellerRegisterForm";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";

export default function RegisterSeller() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-white">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3">
        <div className="hidden lg:flex flex-col justify-center items-center bg-primary p-8 col-span-1">
          <img
            src={logoWaleKreasi}
            alt="Wale Kreasi"
            className="h-32 w-32 mb-4 bg-white rounded-full p-3"
          />
          <h2 className="text-2xl mt-3 font-bold text-white text-center">
            Buka Toko di WaleKreasi 
          </h2>
          <p className="text-white font-light mt-1 text-center max-w-sm">
            Jadilah bagian dari ekosistem ekonomi kreatif Sulawesi Utara !
          </p>
        </div>

        <div className="w-full h-full flex justify-center items-center px-6 md:px-16 py-10 col-span-2 overflow-y-auto">
          <div className="w-full max-w-3xl">
            {agreed ? (
              <AuthRegisterSeller />
            ) : (
              <TermsSection onAgree={() => setAgreed(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
