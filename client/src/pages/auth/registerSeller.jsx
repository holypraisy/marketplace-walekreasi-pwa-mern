import { useState } from "react";
import TermsSection from "../../components/auth/sellerTerms";
import AuthRegisterSeller from "../../components/auth/sellerRegisterForm";

export default function RegisterSeller() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="mx-auto w-full max-w-md">
      {agreed ? (
        <AuthRegisterSeller />
      ) : (
        <TermsSection onAgree={() => setAgreed(true)} />
      )}
    </div>
  );
}
