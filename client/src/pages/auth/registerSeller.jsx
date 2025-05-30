import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { sellerRegisterFormControls } from "@/config";
import { registerSeller } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";

const initialState = {
  sellerName: "", // was: name
  phoneNumber: "",
  email: "",
  password: "",
  storeName: "",
  storeDescription: "",
  productionAddress: "",
  accountOwner: "",
  bankName: "",
  bankAccountNumber: "",
  eWallets: "",
};


function AuthRegisterSeller() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerSeller(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({ title: data?.payload?.message });
        navigate("/auth/login");
      } else {
        toast({ title: data?.payload?.message, variant: "destructive" });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="lg:hidden flex justify-center gap-1 items-center">
        <img src={logoWaleKreasi} alt="Logo Wale Kreasi" className="h-20 w-20" />
        <div>
          <h1 className="text-3xl font-bold">Wale Kreasi .</h1>
          <p>Daftar sebagai Seller</p>
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Daftar sebagai Seller
        </h1>
        <p className="mt-2">
          Sudah punya akun?
          <Link to="/auth/login" className="ml-2 text-primary hover:underline">
            Masuk
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={sellerRegisterFormControls}
        buttonText="Daftar Seller"
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegisterSeller;
