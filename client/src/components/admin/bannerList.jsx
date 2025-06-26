import { useDispatch, useSelector } from "react-redux";
import { deleteBanner } from "@/store/admin/banner-slice";
import { Trash2 } from "lucide-react";

function BannerList() {
  const dispatch = useDispatch();
  const { banners, isLoading } = useSelector((state) => state.bannerSlice);

  if (isLoading) return <p>Memuat banner...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {banners.map((banner) => (
        <div key={banner._id} className="border rounded p-4 shadow bg-white">
          <img src={banner.imageUrl} alt={banner.caption} className="w-full h-40 object-cover rounded" />
          <div className="mt-2">
            <p className="font-semibold">📍 {banner.type}</p>
            <p>{banner.caption}</p>
            {banner.redirectUrl && <a href={banner.redirectUrl} className="text-blue-500 underline">Visit</a>}
            <button
              onClick={() => dispatch(deleteBanner(banner._id))}
              className="mt-2 inline-flex items-center text-red-500 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4 mr-1" /> Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BannerList;
