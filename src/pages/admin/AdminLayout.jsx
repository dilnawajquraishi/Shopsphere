// import { Outlet, Link } from "react-router-dom";
// import { AppBar, Toolbar, Button, Drawer, List, ListItem } from "@mui/material";

// function AdminLayout() {
//   return (
//     <div style={{ display: "flex" }}>

//       {/* SIDEBAR */}
//       <Drawer variant="permanent">
//         <List>

//           <ListItem>
//             <Link to="/admin">Dashboard</Link>
//           </ListItem>

//           <ListItem>
//             <Link to="/admin/add-product">Add Product</Link>
//           </ListItem>

//           <ListItem>
//             <Link to="/admin/manage-products">Manage Products</Link>
//           </ListItem>

//         </List>
//       </Drawer>

//       {/* MAIN */}
//       <div style={{ width: "100%", padding: "20px" }}>
//         <AppBar position="static">
//           <Toolbar>
//             <h3>ShopSphere Admin</h3>
//           </Toolbar>
//         </AppBar>

//         <Outlet />
//       </div>

//     </div>
//   );
// }

// export default AdminLayout;




import { Outlet, Link } from "react-router-dom";

function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "220px",
        height: "100vh",
        background: "#111827",
        color: "white",
        padding: "20px"
      }}>

        <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>

        <Link to="/admin" style={{ display: "block", marginBottom: "10px", color: "white" }}>
          📊 Dashboard
        </Link>

        <Link to="/admin/add-product" style={{ display: "block", marginBottom: "10px", color: "white" }}>
          ➕ Add Product
        </Link>

        <Link to="/admin/manage-products" style={{ display: "block", marginBottom: "10px", color: "white" }}>
          📦 Manage Products
        </Link>

      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />   {/* 🔥 THIS IS REQUIRED */}
      </div>

    </div>
  );
}

export default AdminLayout;