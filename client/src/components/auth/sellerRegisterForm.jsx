import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { registerSeller } from "@/store/auth-slice";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";
import { sellerRegisterFormControls } from "../../config/index.js";

export default function AuthRegisterSeller() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const sections = [
    "Identitas Pemilik Usaha",
    "Data Usaha / Toko",
    "Data Pembayaran",
  ];

  const initialState = sellerRegisterFormControls.reduce(
    (acc, field) => ({ ...acc, [field.name]: "" }),
    {}
  );

  const [formData, setFormData] = useState(initialState);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const currentSection = sections[step];
  const controlsToRender = sellerRegisterFormControls.filter(
    (control) => control.section === currentSection
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleNext() {
    setStep((prev) => Math.min(prev + 1, sections.length - 1));
  }

  function handleBack() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const result = await dispatch(registerSeller(formData));
      if (result.payload?.success) {
        toast({ title: result.payload.message });
        navigate("/auth/login");
      } else {
        toast({ title: result.payload?.message || "Register gagal", variant: "destructive" });
      }
    } catch {
      toast({ title: "Terjadi kesalahan saat mendaftar", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 ">
      <div className="flex flex-col items-center mb-8">
        <div className="lg:hidden">
           <img src={logoWaleKreasi} alt="Logo Wale Kreasi" className="h-20 w-20 mb-4" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Daftar sebagai Seller</h1>
        <p className="mt-2 text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Masuk
          </Link>
        </p>
      </div>

      {/* Progress bar */}
      <div className="flex justify-between mb-6">
        {sections.map((section, index) => (
          <div
            key={section}
            className={`flex-1 border-b-2 pb-1 text-center font-medium ${
              index === step ? "border-indigo-600 text-indigo-600" : "border-gray-300 text-gray-400"
            }`}
          >
            {section}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {controlsToRender.map(({ name, label, placeholder, componentType, type }) => (
          <div key={name}>
            <label htmlFor={name} className="block mb-1 font-semibold text-gray-700">
              {label}
            </label>

            {componentType === "input" ? (
              <input
                id={name}
                name={name}
                type={type || "text"}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required={
                  !["eWallets", "eWalletsAccountOwner", "eWalletAccountNumber"].includes(name)
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            ) : componentType === "textarea" ? (
              <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            ) : null}
          </div>
        ))}

        <div className="flex justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Kembali
            </button>
          ) : (
            <div />
          )}

          {step < sections.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Selanjutnya
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className={`px-6 py-2 rounded-md transition ${
                submitting
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {submitting ? "Memproses..." : "Daftar Seller"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

