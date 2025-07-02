import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) {
  const [errors, setErrors] = useState({});

  // Validasi saat submit
  const validate = () => {
    const newErrors = {};

    formControls.forEach((control) => {
      const value = formData[control.name];

      if (!value || value.trim() === "") {
        newErrors[control.name] = `${control.label} wajib diisi`;
      }

      // Validasi email
      if (control.name === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors.email = "Format email tidak valid";
        }
      }

      // Validasi password minimal 8 karakter
      if (control.name === "password" && value.length < 8) {
        newErrors.password = "Kata sandi minimal 8 karakter";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Menangani perubahan field
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // reset error saat diubah
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(e);
    }
  };

  function renderInputsByComponentType(control) {
    const value = formData[control.name] || "";
    const isInvalid = !!errors[control.name];
    const inputClass = isInvalid
      ? "border-red-500 focus-visible:ring-red-500"
      : "";

    switch (control.componentType) {
      case "input":
        return (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type}
            value={value}
            onChange={(e) => handleChange(control.name, e.target.value)}
            className={inputClass}
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(val) => handleChange(control.name, val)}
            value={value}
          >
            <SelectTrigger className={`w-full ${inputClass}`}>
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((optionItem) => (
                <SelectItem key={optionItem.id} value={optionItem.id}>
                  {optionItem.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "textarea":
        return (
          <Textarea
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            value={value}
            onChange={(e) => handleChange(control.name, e.target.value)}
            className={inputClass}
          />
        );

      default:
        return (
          <Input
            name={control.name}
            placeholder={control.placeholder}
            id={control.name}
            type={control.type}
            value={value}
            onChange={(e) => handleChange(control.name, e.target.value)}
            className={inputClass}
          />
        );
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
            {errors[controlItem.name] && (
              <span className="text-red-500 text-xs mt-1">
                {errors[controlItem.name]}
              </span>
            )}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
