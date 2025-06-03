import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSellerProfile } from "../../store/seller/profile-slice";

function SellerProfilePage() {
  const dispatch = useDispatch();
  const { profile: store, isLoading, error } = useSelector((state) => state.sellerProfile);

  useEffect(() => {
    dispatch(fetchSellerProfile());
  }, [dispatch]);

  if (isLoading) return <p>Memuat data toko...</p>;
  if (error) return <p className="text-red-500">Gagal memuat data toko: {error}</p>;
  if (!store) return <p>Data toko tidak ditemukan.</p>;

  return (
    <div className="">
      <h2 className="text-2xl font-bold">Halo, {store.sellerName} 👋</h2>
      <div className="flex gap-4 items-start mt-4">
        {store.storeLogoUrl && (
          <img
            src={store.storeLogoUrl}
            alt="Logo Toko"
            className="w-24 h-24 rounded border object-cover"
          />
        )}
        <div className="space-y-1"> 
          <div className="space-y-4">
              <h1 className="font-bold text-xl">Data Diri</h1> 
              <div>
                <h1>Nama Lengkap</h1>
                <p>{store.sellerName}</p>
              </div>
              <div>
                <h1>Nomor Telepon</h1>
                <p>{store.phoneNumber}</p>
              </div>

              <div>
                <h1>Alamat Domisili</h1>
                <p>{store.domicileAddres}</p>
              </div>
              <div>
                <h1>NIK (Nomor Induk Kependudukan)</h1>
                <p>{store.nik}</p>
              </div>
          </div> 

          <div className="space-y-4">
              <h1 className="font-bold text-xl">Data Usaha</h1> 
              <div>
                <h1>Nama Lengkap</h1>
                <p>{store.sellerName}</p>
              </div>
              <div>
                <h1>Nomor Telepon</h1>
                <p>{store.phoneNumber}</p>
              </div>

              <div>
                <h1>Alamat Domisili</h1>
                <p>{store.domicileAddres}</p>
              </div>
              <div>
                <h1>NIK (Nomor Induk Kependudukan)</h1>
                <p>{store.nik}</p>
              </div>
          </div> 


        
        </div>
      </div>
    </div>
  );
}

export default SellerProfilePage;
