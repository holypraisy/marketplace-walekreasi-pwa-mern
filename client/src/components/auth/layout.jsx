import { Outlet } from "react-router-dom";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";

function AuthLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Kiri - Ilustrasi & ajakan */}
      <div className="hidden md:flex w-full md:w-1/2 bg-primary items-center justify-center p-8">
        <div className="text-center max-w-md">
          <img
            src={logoWaleKreasi}  
            alt="Logo Wale Kreasi"
            className="w-40 h-40 mx-auto mb-6 bg-white rounded-full p-4"
          />
          <h2 className="text-xl font-semibold text-white">
            Belanja Kreasi Lokal Lebih Praktis
          </h2>
          <p className="mt-2 text-secondary">
            Gabung dan Dukung UMKM Sulut dari Genggamanmu
          </p>
        </div>
      </div>

      {/* Kanan - Form login/register */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-8 py-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
