import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSelector } from "react-redux";

export default function CustomerBiodata() {
  const { profile, loading, error } = useSelector((state) => state.customersInfo);

  if (loading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold text-primary">
            Biodata Pengguna
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Memuat data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl font-semibold text-primary">
            Biodata Pengguna
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">Gagal memuat data: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl font-semibold text-primary">
          Biodata Pengguna
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4">
        <div>
          <p className="text-gray-600 text-sm md:text-base font-light">Nama:</p>
          <p className="text-primary font-medium text-base md:text-lg">
            {profile?.userName || "-"}
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm md:text-base font-light">Email:</p>
          <p className="text-primary font-medium text-base md:text-lg">
            {profile?.email || "-"}
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm md:text-base font-light">Nomor Telepon:</p>
          <p className="text-primary font-medium text-base md:text-lg">
            {profile?.phoneNumber || "-"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
