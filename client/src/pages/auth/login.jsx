import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";

import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/shop/home";

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await dispatch(loginUser(formData));

      if (result?.payload?.success) {
        toast({
          title: result.payload.message,
        });
        navigate(from, { replace: true });
      } else {
        toast({
          title: result?.payload?.message || "Login gagal",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Terjadi kesalahan saat login.",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="x-auto w-full max-w-md space-y-8 px-4">
      {/* Logo & Branding (mobile) */}
      <div className="flex flex-col md:hidden items-center justify-center">
        <img src={logoWaleKreasi} alt="Logo Wale Kreasi" className="w-14 h-14" />
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Wale Kreasi</h1>
          <p className="text-sm text-gray-500">Belanja Kreasi Lokal Lebih Praktis</p>
        </div>
      </div>

      {/* Header Text */}
      <div className="space-y-2 text-left">
        <h1 className="text-2xl font-semibold text-gray-900">Masuk ke Akun Anda</h1>
        <p className="text-sm text-gray-600">
          Belum punya akun?
          <Link to="/auth/register" className="ml-2 text-primary font-semibold hover:underline">
            Mendaftar
          </Link>
        </p>
      </div>

      {/* Form Login */}
      <CommonForm
        formControls={loginFormControls}
        buttonText="Masuk"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
