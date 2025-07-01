import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import logoWaleKreasi from '../../assets/logo-WaleKreasi.png';

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="flex justify-center gap-1">
        <img src={logoWaleKreasi} alt="Logo Wale Kreasi"
        className="w-16"  />
        <div> 
          <h1 className="text-2xl font-bold">Wale <br /> Kreasi .</h1>
        </div>
      </div>
      <div className="text-left">
        <h1 className="text-xl lg:text-3xl font-light tracking-tight text-foreground">
          Masuk ke akun anda
        </h1>
        <p className="mt-2 text-xs lg:text-base font-bold">
          Belum punya akun ?
          <Link
            className="font-bold ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Mendaftar
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Masuk"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
