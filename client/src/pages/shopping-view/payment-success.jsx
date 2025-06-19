import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-[80vh] px-4">
      <Card className="w-full max-w-md text-center p-6 shadow-xl rounded-2xl border border-green-400">
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle className="text-green-500 w-16 h-16" />
            <CardTitle className="text-2xl font-bold">Pembayaran Berhasil</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          <p className="text-muted-foreground text-sm">
            Terima kasih atas pesanan Anda. Kami akan segera memprosesnya.
          </p>
          <Button className="w-full" onClick={() => navigate("/shop/account")}>
            Lihat Daftar Pesanan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;
