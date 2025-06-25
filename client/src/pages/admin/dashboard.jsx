import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "@/store/admin/dashboard-slice";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function AdminDashboardPage() {
  const dispatch = useDispatch();
  const { sellerCount, customerCount, weeklyPerformance, loading } = useSelector(
    (state) => state.adminDashboard
  );

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Admin</h1>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-muted-foreground">Jumlah Seller Terdaftar</p>
          <h2 className="text-3xl font-bold">{sellerCount}</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-muted-foreground">Jumlah Customer</p>
          <h2 className="text-3xl font-bold">{customerCount}</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Performa Mingguan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
