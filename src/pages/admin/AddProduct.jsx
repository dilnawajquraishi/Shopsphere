
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

      fetch(`https://shopsphere-backend-qxry.onrender.com/api/products/${id}`)
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
            setPreview(`https://shopsphere-backend-qxry.onrender.com/${data.image}`);
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
        ? `https://shopsphere-backend-qxry.onrender.com/api/products/${id}`
        : `https://shopsphere-backend-qxry.onrender.com/api/products/add`;

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
          placeholder="Sizes Example: S,M,L,XL"
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

