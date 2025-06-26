import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchBanners } from "@/store/admin/banner-slice";
import BannerUploadForm from "@/components/admin/BannerUploadForm";
import BannerList from "@/components/admin/BannerList";

function BannerSetting() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pengaturan Banner</h1>
      <BannerUploadForm />
      <BannerList />
    </div>
  );
}

export default BannerSetting;
