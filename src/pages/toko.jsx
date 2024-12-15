import { useEffect, useState } from "react";
import { ButtonAdd, ButtonEdit, ButtonDelete } from "../components/button";
import axios from "axios";

export default function TokoPage() {
  const [toko, setToko] = useState([]);
  const [newStore, setNewStore] = useState({
    nama: "",
    alamat: "",
    barang: [],
    imageUrl: "",
  });
  const [editingStore, setEditingStore] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch stores from the API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/toko`)
      .then((response) => response.json())
      .then((data) => setToko(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "upload_barang");
      formData.append("cloud_name", "dzev0az08");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dzev0az08/image/upload/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setNewStore((prevState) => ({
          ...prevState,
          imageUrl: response.data.secure_url,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Create new store
  const handleCreate = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/toko`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStore),
    })
      .then((response) => response.json())
      .then((data) => {
        setToko([...toko, data]);
        setNewStore({
          nama: "",
          alamat: "",
          barang: [],
          imageUrl: "",
        });
        setIsDialogOpen(false);
      })
      .catch((error) => console.error("Error creating store:", error));
  };

  // Update store
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/toko/${editingStore.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingStore),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedStores = toko.map((store) =>
          store.id === data.id ? data : store
        );
        setToko(updatedStores);
        setEditingStore(null);
        setIsDialogOpen(false);
      })
      .catch((error) => console.error("Error updating store:", error));
  };

  // Delete store
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/toko/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setToko(toko.filter((store) => store.id !== id));
      })
      .catch((error) => console.error("Error deleting store:", error));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5 py-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nama Toko</th>
            <th scope="col" className="px-6 py-3">Alamat</th>
            <th scope="col" className="px-6 py-3">Data Barang</th>
            <th scope="col" className="px-6 py-3">Gambar</th>
            <th scope="col" className="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(toko) && toko.map((store) => (
            <tr className="odd:bg-white even:bg-gray-50 border-b" key={store.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {store.nama}
              </th>
              <td className="px-6 py-4">{store.alamat}</td>
              <td className="px-6 py-4">
                {Array.isArray(store.barang) ? (
                  store.barang.map((barang, index) => (
                    <div key={index}>{barang.nama}</div>
                  ))
                ) : (
                  <span>No Items</span>
                )}
              </td>
              <td className="px-6 py-4">
                {store.imageUrl ? (
                  <img
                    src={store.imageUrl}
                    alt={store.nama}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="px-6 py-4">
                <ButtonEdit
                  onClick={() => {
                    setEditingStore(store);
                    setIsDialogOpen(true);
                  }}
                />
                <ButtonDelete onClick={() => handleDelete(store.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ButtonAdd
        onClick={() => {
          setNewStore({
            nama: "",
            alamat: "",
            barang: [],
            imageUrl: "",
          });
          setEditingStore(null);
          setIsDialogOpen(true);
        }}
        className="mt-6 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Add Store
      </ButtonAdd>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{editingStore ? "Edit Store" : "Add New Store"}</h3>
            <form onSubmit={editingStore ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-gray-700">Store Name</label>
                <input
                  type="text"
                  value={editingStore ? editingStore.nama : newStore.nama}
                  onChange={(e) => {
                    if (editingStore) {
                      setEditingStore({ ...editingStore, nama: e.target.value });
                    } else {
                      setNewStore({ ...newStore, nama: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  value={editingStore ? editingStore.alamat : newStore.alamat}
                  onChange={(e) => {
                    if (editingStore) {
                      setEditingStore({ ...editingStore, alamat: e.target.value });
                    } else {
                      setNewStore({ ...newStore, alamat: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Store Image</label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                {editingStore ? "Update Store" : "Add Store"}
              </button>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="ml-4 px-6 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
