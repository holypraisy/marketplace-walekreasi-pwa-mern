import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCustomers } from "@/store/admin/customers-slice";

function CustomersInfoPage() {
  const dispatch = useDispatch();
  const { customers, isLoading, error } = useSelector((state) => state.customersInfo);

  useEffect(() => {
    dispatch(fetchAllCustomers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manajemen Customer</h1>

      {isLoading ? (
        <p>Memuat data customer...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Nama</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Tanggal Daftar</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((user) => (
                <tr key={user._id}>
                  <td className="p-2 border">{user.userName}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    Belum ada customer terdaftar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomersInfoPage;
