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
  const [formErrors, setFormErrors] = useState({});
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const currentSection = sections[step];
  const controlsToRender = sellerRegisterFormControls.filter(
    (control) => control.section === currentSection
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validateStepFields() {
    const currentControls = sellerRegisterFormControls.filter(
      (control) => control.section === currentSection
    );

    const errors = {};
    currentControls.forEach(({ name, label }) => {
      const value = formData[name]?.trim();

      if (
        !value &&
        !["eWallet", "eWalletsAccountOwner", "eWalletAccountNumber"].includes(name)
      ) {
        errors[name] = `${label} wajib diisi`;
      } else {
        if (name === "nik" && value && value.length !== 16) {
          errors[name] = "NIK harus terdiri dari 16 digit";
        }
        if (
          name === "email" &&
          value &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          errors[name] = "Format email tidak valid";
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (validateStepFields()) {
      setStep((prev) => Math.min(prev + 1, sections.length - 1));
    } else {
      toast({
        title: "Lengkapi data terlebih dahulu",
        description: "Beberapa isian belum valid atau belum diisi.",
        variant: "destructive",
      });
    }
  }

  function handleBack() {
    setStep((prev) => Math.max(prev - 1, 0));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validateStepFields()) return;

    setSubmitting(true);
    try {
      const result = await dispatch(registerSeller(formData));
      if (result.payload?.success) {
        toast({ title: result.payload.message });
        navigate("/auth/login");
      } else {
        toast({
          title: result.payload?.message || "Register gagal",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Terjadi kesalahan saat mendaftar",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full space-y-14">
      <div className="flex flex-col items-center mt-6">
        <div className="lg:hidden text-center">
          <img
            src={logoWaleKreasi}
            alt="Logo Wale Kreasi"
            className="h-20 w-20 mb-4"
          />
        </div>
        <div className="text-center text-2xl md:flex md:gap-2 md:text-3xl font-bold text-gray-900">
          <h1>Pendaftaran Seller </h1>
          <h1>Wale Kreasi</h1>
        </div>
      </div>

      <div className="flex justify-between mb-6">
        {sections.map((section, index) => (
          <div
            key={section}
            className={`flex-1 border-b-2 pb-1 text-center text-sm md:text-base font-medium ${
              index === step
                ? "border-primary text-primary"
                : "border-gray-300 text-gray-400"
            }`}
          >
            {section}
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {controlsToRender.map(({ name, label, placeholder, componentType, type }) => (
            <div key={name} className="col-span-1">
              <label htmlFor={name} className="block mb-1 font-semibold text-gray-700">
                {label}
              </label>

              {componentType === "input" ? (
                <>
                  <input
                    id={name}
                    name={name}
                    type={type || "text"}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-3 py-2 transition focus:outline-none focus:ring-2 ${
                      formErrors[name]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-primary focus:border-primary"
                    }`}
                  />
                  {formErrors[name] && (
                    <p className="mt-1 text-sm text-red-600">{formErrors[name]}</p>
                  )}
                </>
              ) : componentType === "textarea" ? (
                <>
                  <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`w-full rounded-md border px-3 py-2 h-24 resize-none transition focus:outline-none focus:ring-2 ${
                      formErrors[name]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-primary focus:border-primary"
                    }`}
                  />
                  {formErrors[name] && (
                    <p className="mt-1 text-sm text-red-600">{formErrors[name]}</p>
                  )}
                </>
              ) : null}
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4">
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
              className="px-4 py-2 rounded-md bg-primary text-white border border-transparent hover:bg-white hover:text-primary hover:border-primary transition"
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
                  : "bg-primary hover:bg-indigo-700 text-white"
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
