import { useState } from "react";
import BannerSetting from "@/components/admin/BannerSetting";
// import NotificationSetting from "@/components/admin/NotificationSetting";
import { Button } from "@/components/ui/button";

function AdminSettingPage() {
  const [activeTab, setActiveTab] = useState("banner");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>

      <div className="flex gap-4 mb-6">
        <Button
          variant={activeTab === "banner" ? "default" : "outline"}
          onClick={() => setActiveTab("banner")}
        >
          Banner Setting
        </Button>
        {/* <Button
          variant={activeTab === "notification" ? "default" : "outline"}
          onClick={() => setActiveTab("notification")}
        >
          Notifikasi Setting
        </Button> */}
      </div>

      {/* Render konten tab */}
      {activeTab === "banner" && <BannerSetting />}
      {/* {activeTab === "notification" && <NotificationSetting />} */}
    </div>
  );
}

export default AdminSettingPage;
