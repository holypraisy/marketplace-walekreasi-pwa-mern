import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllOrdersByUserId,
  getOrderDetails,
} from "@/store/shop/order-slice";
import {
  fetchBanners,
  selectCustomerBanners,
} from "@/store/admin/banner-slice";
import { logoutUser } from "@/store/auth-slice";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import ShoppingOrders from "@/components/shopping-view/orders";
import Address from "@/components/shopping-view/address";
import { CircleUser, ShoppingBag, MapPin, LogOut, Store } from "lucide-react";

const tabNavs = [
  { key: "akun", label: "Biodata Diri", Icon: CircleUser},
  { key: "pesanan", label: "Riwayat Pesanan", Icon: ShoppingBag },
  { key: "alamat", label: "Daftar Alamat", Icon: MapPin },
];

const statusTabs = [
  { key: "Menunggu Konfirmasi", label: "Menunggu Konfirmasi" },
  { key: "Diproses", label: "Diproses" },
  { key: "Dalam Pengiriman", label: "Dalam Pengiriman" },
  { key: "Sudah Diterima", label: "Sudah Diterima" },
  { key: "Ditolak", label: "Ditolak" },
  { key: "review", label: "Beri Penilaian" },
];

export default function CustomerProfileTabs() {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState("akun");
  const [activeStatus, setActiveStatus] = useState("Menunggu");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });
  const [tabSliderStyle, setTabSliderStyle] = useState({ left: 0, width: 0 });

  const tabRefs = useRef({});
  const navTabRefs = useRef({});
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails, isLoading } = useSelector((state) => state.shopOrder);
  const customerBanners = useSelector(selectCustomerBanners);
  const backgroundImage = customerBanners?.[0]?.imageUrl;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrdersByUserId(user.id));
    }
    dispatch(fetchBanners());
  }, [dispatch, user]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  useEffect(() => {
    const activeTab = tabRefs.current[activeStatus];
    if (activeTab) {
      setSliderStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeStatus]);

  useEffect(() => {
    const navTab = navTabRefs.current[tabValue];
    if (navTab) {
      setTabSliderStyle({
        left: navTab.offsetLeft,
        width: navTab.offsetWidth,
      });
    }
  }, [tabValue]);

  const filteredOrders =
    activeStatus === "review"
      ? orderList?.filter(
          (order) => order?.orderStatus === "Sudah Diterima" && !order?.isReviewed
        )
      : orderList?.filter((order) => order?.orderStatus === activeStatus);

  const handleFetchOrderDetails = (orderId) => {
    dispatch(getOrderDetails(orderId));
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[200px] md:h-[250px] lg:h-[300px] w-full overflow-hidden">
        {backgroundImage ? (
          <img src={backgroundImage} alt="Customer Banner" className="h-full w-full object-cover object-center" />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Tidak ada banner customer</span>
          </div>
        )}
        <div className="absolute bottom-6 left-4 md:left-12 bg-secondary/70 text-accent px-4 py-2 rounded-lg text-xl md:text-3xl font-semibold shadow-lg backdrop-blur-sm">
          Halo, {user?.name || "Pengguna"}! 👋
        </div>
      </div>

      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full max-w-7xl mx-auto mt-6 px-4">
        <TabsList className="relative w-full flex justify-start flex-nowrap gap-6 overflow-x-auto bg-white">
          {tabNavs.map(({key, label, Icon}) => (
            <TabsTrigger
              key={key}
              value={key}
              ref={(el) => (navTabRefs.current[key] = el)}
              className="relative py-2 px-4 whitespace-nowrap text-base font-medium border-b-2 border-transparent hover:border-gray-400 data-[state=active]:text-primary transition-all duration-300 ease-in-out rounded-none"
            >
              <Icon className="w-4 mr-2"/>
              {label}
            </TabsTrigger>
          ))}
          <span
            className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300"
            style={{ left: tabSliderStyle.left, width: tabSliderStyle.width }}
          />
        </TabsList>

        <TabsContent value="akun">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-semibold text-primary">Biodata Pengguna</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-gray-600 text-sm md:text-base font-light">Nama:</p>
                <p className="text-primary font-medium text-base md:text-lg">{user?.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm md:text-base font-light">Email:</p>
                <p className="text-primary font-medium text-base md:text-lg">{user?.email}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pesanan">
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold text-primary">
              Riwayat Pesanan
            </CardTitle>
          </CardHeader>
          <CardContent>
          <div className="relative flex-nowrap overflow-x-auto border-b border-gray-300 mb-4 scrollbar-thin scrollbar-thumb-gray-300">
            <div className="flex w-max gap-3 px-1">
              {statusTabs.map((tab) => (
                <button
                  key={tab.key}
                  ref={(el) => (tabRefs.current[tab.key] = el)}
                  onClick={() => setActiveStatus(tab.key)}
                  className={`relative text-sm sm:text-base font-medium px-3 sm:px-4 py-2 transition-colors duration-300 whitespace-nowrap ${
                    activeStatus === tab.key ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <span
              className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300"
              style={{ width: sliderStyle.width, left: sliderStyle.left }}
            />
          </div>


            {/* Komponen Riwayat Pesanan */}
            <ShoppingOrders activeStatus={activeStatus} />
          </CardContent>
        </Card>
        </TabsContent>



        <TabsContent value="alamat">
          <div className="mt-6">
            <Address selectedId={null} setCurrentSelectedAddress={() => {}} />
          </div>
        </TabsContent>
      </Tabs>

      <div className="p-4">
        <div>
          <Link to="/auth/register-seller"
                className="w-full lg:w-2/5 flex gap-2 p-3 items-center bg-secondary/50 rounded-md mb-4 ">
            <Store className="w-4 md:w-5"/>
            <p className="text-base md:text-lg">Buka Toko di Wale Kreasi</p>
          </Link>
        </div>

        <div className="w-full lg:w-2/5 flex gap-2 p-3 items-center bg-secondary/50 rounded-md cursor-pointer">
          <LogOut onClick={handleLogout}
                  className="w-4 md:w-5 "/>
          <p className="text-base md:text-lg">Keluar</p>
        </div>


      </div>

    </div>
  );
}
