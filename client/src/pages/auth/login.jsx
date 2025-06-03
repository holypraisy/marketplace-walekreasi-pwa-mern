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
      <div className="lg:hidden flex justify-center gap-1 items-center">
        <img src={logoWaleKreasi} alt="Logo Wale Kreasi"
        className="h-20 w-20"  />
        <div> 
          <h1 className="text-3xl font-bold">Wale Kreasi .</h1>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Masuk ke akun anda
        </h1>
        <p className="mt-2">
          Belum punya akun ?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
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
