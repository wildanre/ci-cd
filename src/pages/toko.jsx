import { useEffect, useState } from "react";

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
      .then((data) => setToko(data));
  }, []);

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
      });
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
      });
  };

  // Delete store
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/toko/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToko(toko.filter((store) => store.id !== id));
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5 py-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Store Name</th>
            <th scope="col" className="px-6 py-3">Address</th>
            <th scope="col" className="px-6 py-3">Items</th>
            <th scope="col" className="px-6 py-3">Store Image</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {toko.map((store) => (
            <tr className="odd:bg-white even:bg-gray-50 border-b" key={store.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {store.nama}
              </th>
              <td className="px-6 py-4">{store.alamat}</td>
              <td className="px-6 py-4">
                {store.barang.map((barang, index) => (
                  <div key={index}>{barang.nama}</div>
                ))}
              </td>
              <td className="px-6 py-4">
                <img
                  src={store.imageUrl}
                  alt={store.nama}
                  className="w-10 h-10 object-cover rounded-full"
                />
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setEditingStore(store);
                    setIsDialogOpen(true);
                  }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(store.id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to open the dialog for adding a new store */}
      <button
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
        Add New Store
      </button>

      {/* Dialog for creating or editing store */}
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
                <label className="block text-gray-700">Store Image URL</label>
                <input
                  type="text"
                  value={editingStore ? editingStore.imageUrl : newStore.imageUrl}
                  onChange={(e) => {
                    if (editingStore) {
                      setEditingStore({ ...editingStore, imageUrl: e.target.value });
                    } else {
                      setNewStore({ ...newStore, imageUrl: e.target.value });
                    }
                  }}
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
