import { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";

function AdminUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetch("https://shopsphere-backend-qxry.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));

  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">

      <AdminSidebar />

      <div className="lg:ml-64 p-4 md:p-6">

        <h1 className="text-3xl font-bold mb-6">
          All Users
        </h1>

        <div className="space-y-4">

          {users.map((user) => (

            <div
              key={user._id}
              className="bg-white rounded-2xl shadow-sm p-5 flex items-center justify-between"
            >

              <div>

                <p className="font-bold text-lg">
                  {user.name}
                </p>

                <p className="text-gray-500 text-sm">
                  {user.email}
                </p>

              </div>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                User
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdminUsers;