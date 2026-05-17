import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    color: "",
    size: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // 🔥 LOAD PRODUCT FOR EDIT
  useEffect(() => {

    if (isEdit) {

      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {

          setForm({
            name: data.name || "",
            price: data.price || "",
            category: data.category || "",
            stock: data.stock || "",
            color: data.color || "",
            size: data.size || ""
          });

          if (data.image) {
            setPreview(`http://localhost:5000/${data.image}`);
          }

        });

    }

  }, [id, isEdit]);

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // 🔥 SUBMIT
  const submit = async () => {

    if (
      !form.name ||
      !form.price ||
      !form.category ||
      !form.stock ||
      !form.color ||
      !form.size
    ) {

      alert("Fill all fields");
      return;

    }

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    if (image) {
      data.append("image", image);
    }

    try {

      const url = isEdit
        ? `http://localhost:5000/api/products/${id}`
        : `http://localhost:5000/api/products/add`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: data
      });

      const result = await res.json();

      if (res.ok) {

        alert(
          isEdit
            ? "Product Updated Successfully"
            : "Product Added Successfully"
        );

        navigate("/admin/products");

      } else {

        alert(result.message || "Something went wrong");

      }

    } catch (err) {

      console.log(err);
      alert("Server Error");

    }

  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">

          {isEdit ? "Edit Product" : "Add Product"}

        </h2>

        {/* NAME */}
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
        />

        {/* PRICE */}
        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
        />

        {/* CATEGORY */}
        <input
          type="text"
          name="category"
          value={form.category}
          placeholder="Category"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
        />

        {/* STOCK */}
        <input
          type="number"
          name="stock"
          value={form.stock}
          placeholder="Stock"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
        />

        {/* COLOR */}
        <input
          type="text"
          name="color"
          value={form.color}
          placeholder="Color"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
        />

        {/* SIZE */}
        <input
          type="text"
          name="size"
          value={form.size}
          placeholder="Size (S,M,L)"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 outline-none"
        />

        {/* IMAGE PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
        )}

        {/* IMAGE */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full mb-5"
        />

        {/* BUTTON */}
        <button
          onClick={submit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
        >

          {isEdit ? "Update Product" : "Submit Product"}

        </button>

      </div>

    </div>
  );
}

export default AddProduct;





// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function AddProduct() {

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const isEdit = !!id;

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     stock: "",
//     color: "",
//     size: ""
//   });

//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState("");

//   // 🔥 EDIT LOAD
//   useEffect(() => {
//     if (isEdit) {
//       fetch(`http://localhost:5000/api/products/${id}`)
//         .then(res => res.json())
//         .then(data => {
//           setForm(data);
//           if (data.image) {
//             setPreview(`http://localhost:5000/${data.image}`);
//           }
//         });
//     }
//   }, [id]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submit = async () => {

//     if (
//       !form.name ||
//       !form.price ||
//       !form.category ||
//       !form.stock ||
//       !form.color ||
//       !form.size ||
//       (!image && !isEdit)
//     ) {
//       alert("Fill all fields");
//       return;
//     }

//     const data = new FormData();

//     Object.keys(form).forEach(key => {
//       data.append(key, form[key]);
//     });

//     if (image) data.append("image", image);

//     const url = isEdit
//       ? `http://localhost:5000/api/products/${id}`
//       : `http://localhost:5000/api/products/add`;

//     const method = isEdit ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       body: data
//     });

//     alert(isEdit ? "Updated" : "Added");

//     navigate("/admin/products");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">

//       <div className="bg-white p-6 rounded shadow w-full max-w-md">

//         <h2 className="text-xl font-bold mb-4 text-center">
//           {isEdit ? "Edit Product" : "Add Product"}
//         </h2>

//         <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="input" />
//         <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="input" />
//         <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="input" />
//         <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" className="input" />
//         <input name="color" value={form.color} onChange={handleChange} placeholder="Color" className="input" />
//         <input name="size" value={form.size} onChange={handleChange} placeholder="Size" className="input" />

//         {preview && (
//           <img src={preview} className="h-32 w-full object-cover mt-3 rounded" />
//         )}

//         <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mt-3" />

//         <button
//           onClick={submit}
//           className="w-full mt-4 bg-green-600 text-white py-2 rounded"
//         >
//           {isEdit ? "Update" : "Add"}
//         </button>

//       </div>

//     </div>
//   );
// }

// export default AddProduct;











// import { useState } from "react";

// function AddProduct() {

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     stock: "",
//     color: "",
//     size: ""
//   });

//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submit = async () => {

//     if (
//       !form.name ||
//       !form.price ||
//       !form.category ||
//       !form.stock ||
//       !form.color ||
//       !form.size ||
//       !image
//     ) {
//       alert("⚠️ Fill all fields");
//       return;
//     }

//     const data = new FormData();

//     Object.keys(form).forEach(key => {
//       data.append(key, form[key]);
//     });

//     data.append("image", image);

//     try {
//       const res = await fetch("http://localhost:5000/api/products/add", {
//         method: "POST",
//         body: data
//       });

//       const result = await res.json();

//       if (res.ok) {
//         alert("🎉 Product Added Successfully!");
//       } else {
//         alert(result.message || "Error");
//       }

//       // reset
//       setForm({
//         name: "",
//         price: "",
//         category: "",
//         stock: "",
//         color: "",
//         size: ""
//       });

//       setImage(null);

//     } catch (err) {
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-[80vh]">

//       <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">

//         <h2 className="text-xl font-bold mb-4 text-center">
//           ➕ Add Product
//         </h2>

//         <input name="name" value={form.name} placeholder="Name" onChange={handleChange} className="input" />
//         <input name="price" value={form.price} placeholder="Price" onChange={handleChange} className="input" />
//         <input name="category" value={form.category} placeholder="Category" onChange={handleChange} className="input" />
//         <input name="stock" value={form.stock} placeholder="Stock" onChange={handleChange} className="input" />
//         <input name="color" value={form.color} placeholder="Color" onChange={handleChange} className="input" />
//         <input name="size" value={form.size} placeholder="Size (S,M,L)" onChange={handleChange} className="input" />

//         <input
//           type="file"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="mb-3"
//         />

//         <button
//           onClick={submit}
//           className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//         >
//           Submit Product
//         </button>

//       </div>

//     </div>
//   );
// }

// export default AddProduct;

// import { useState } from "react";

// function AddProduct() {

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     stock: ""
//   });

//   const [image, setImage] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submit = async () => {

//     const data = new FormData();

//     data.append("name", form.name);
//     data.append("price", form.price);
//     data.append("category", form.category);
//     data.append("stock", form.stock);
//     if (image) data.append("image", image);

//     await fetch("http://localhost:5000/api/products/add", {
//       method: "POST",
//       body: data
//     });

//     alert("Product Added ✅");
//   };

//   return (
//     <div style={{
//       maxWidth: "500px",
//       margin: "auto",
//       background: "#fff",
//       padding: "20px",
//       borderRadius: "10px"
//     }}>

//       <h2 style={{ marginBottom: "20px" }}>➕ Add Product</h2>

//       {/* NAME */}
//       <input
//         name="name"
//         placeholder="Name"
//         onChange={handleChange}
//         style={inputStyle}
//       />

//       {/* PRICE */}
//       <input
//         name="price"
//         placeholder="Price"
//         onChange={handleChange}
//         style={inputStyle}
//       />

//       {/* CATEGORY */}
//       <input
//         name="category"
//         placeholder="Category"
//         onChange={handleChange}
//         style={inputStyle}
//       />

//       {/* STOCK */}
//       <input
//         name="stock"
//         placeholder="Stock"
//         onChange={handleChange}
//         style={inputStyle}
//       />

//       {/* IMAGE */}
//       <input
//         type="file"
//         onChange={(e) => setImage(e.target.files[0])}
//         style={{ marginBottom: "10px" }}
//       />

//       {/* BUTTON */}
//       <button
//         onClick={submit}
//         style={{
//           background: "green",
//           color: "white",
//           padding: "10px",
//           border: "none",
//           width: "100%",
//           borderRadius: "5px",
//           cursor: "pointer"
//         }}
//       >
//         Submit Product
//       </button>

//     </div>
//   );
// }

// // input style
// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   marginBottom: "10px",
//   border: "1px solid #ccc",
//   borderRadius: "5px"
// };

// export default AddProduct;