import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadBanner } from "@/store/admin/banner-slice";

function BannerUploadForm() {
  const dispatch = useDispatch();
  const [type, setType] = useState("intro");
  const [caption, setCaption] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    formData.append("type", type);
    formData.append("caption", caption);
    formData.append("redirectUrl", redirectUrl);

    dispatch(uploadBanner(formData));
    setCaption("");
    setRedirectUrl("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded">
        <option value="intro">Intro Page</option>
        <option value="landing">Landing Page</option>
        <option value="customer">Customer Page</option>
      </select>
      <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} className="border p-2 w-full rounded" />
      <input type="text" placeholder="Redirect URL (opsional)" value={redirectUrl} onChange={(e) => setRedirectUrl(e.target.value)} className="border p-2 w-full rounded" />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 rounded" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload Banner</button>
    </form>
  );
}

export default BannerUploadForm;
