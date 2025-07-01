import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import {
  fetchBanners,
  selectCustomerBanners,
} from "@/store/admin/banner-slice";

function ShoppingAccount() {
  const dispatch = useDispatch();

  const customerBanners = useSelector(selectCustomerBanners);
  const backgroundImage = customerBanners?.[0]?.imageUrl;

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt="Customer Background"
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Tidak ada banner customer</span>
          </div>
        )}
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Pesanan</TabsTrigger>
              <TabsTrigger value="address">Alamat</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default ShoppingAccount;
