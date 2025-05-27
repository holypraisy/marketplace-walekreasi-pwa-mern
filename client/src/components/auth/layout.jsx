import { Outlet } from "react-router-dom";
import logoWaleKreasi from "../../assets/logo-WaleKreasi.png";


function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center bg-primary w-1/2 px-12">
        <div className="max-w-md space-y-2 text-center text-primary-foreground">
          <div className="mx-auto h-40 w-40 rounded-full bg-background flex items-center justify-center overflow-hidden">
            <img src={logoWaleKreasi} alt="Logo" className="h-32 w-32 object-contain" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Wale Kreasi .
          </h1>
          <p className="font-thin text-lg">
          Lorem ipsum dolor sit amet.
          </p>
        </div>

      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
