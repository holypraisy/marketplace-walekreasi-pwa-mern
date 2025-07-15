import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 px-4">
      {/* Logo & Header (mobile only) */}
      <div className="md:hidden flex flex-col items-center justify-center">
        <img src={logoWaleKreasi} alt="Logo Wale Kreasi" className="w-14 h-14" />
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-800">Wale Kreasi</h1>
          <p className="text-sm text-gray-500">Belanja Kreasi Lokal Lebih Praktis</p>
        </div>
      </div>

      {/* Judul & Link login */}
      <div className="space-y-2 text-left">
        <h1 className="text-2xl font-semibold text-gray-900">Buat Akun Baru</h1>
        <p className="text-sm text-gray-600">
          Sudah punya akun?
          <Link to="/auth/login" className="ml-2 text-primary font-semibold hover:underline">
            Masuk
          </Link>
        </p>
      </div>

      {/* Form */}
      <CommonForm
        formControls={registerFormControls}
        buttonText="Mendaftar"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
