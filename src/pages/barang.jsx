import { useEffect, useState } from "react";

export default function BarangPage() {
  const [barang, setBarang] = useState([]);
  const [newItem, setNewItem] = useState({
    nama: "",
    harga: 0,
    stok: 0,
    tokoId: "",
    imageUrl: "",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch items from the API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/barang`)
      .then((response) => response.json())
      .then((data) => setBarang(data));
  }, []);

  // Create new item
  const handleCreate = (e) => {
    e.preventDefault();

    // Pastikan harga dan stok adalah integer
    const newItemWithValidData = {
      ...newItem,
      harga: parseInt(newItem.harga),
      stok: parseInt(newItem.stok),
      tokoId: newItem.tokoId,
    };

    fetch(`${import.meta.env.VITE_API_URL}/barang`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItemWithValidData),
    })
      .then((response) => response.json())
      .then((data) => {
        setBarang([...barang, data]);
        setNewItem({
          nama: "",
          harga: 0,
          stok: 0,
          tokoId: "",
          imageUrl: "",
        });
        setIsDialogOpen(false);
      });
  };

  // Update item
  const handleUpdate = (e) => {
    e.preventDefault();

    // Pastikan harga dan stok adalah integer
    const updatedItem = {
      ...editingItem,
      harga: parseInt(editingItem.harga),
      stok: parseInt(editingItem.stok),
    };

    fetch(`${import.meta.env.VITE_API_URL}/barang/${editingItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedItems = barang.map((item) =>
          item.id === data.id ? data : item
        );
        setBarang(updatedItems);
        setEditingItem(null);
        setIsDialogOpen(false);
      });
  };

  // Delete item
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/barang/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBarang(barang.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5 py-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Item Name</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Stock</th>
            <th scope="col" className="px-6 py-3">Nama toko</th>
            <th scope="col" className="px-6 py-3">Gambar</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {barang.map((item, index) => (
            <tr className="odd:bg-white even:bg-gray-50 border-b" key={index}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.nama}</th>
              <td className="px-6 py-4">{item.harga}</td>
              <td className="px-6 py-4">{item.stok}</td>
              <td className="px-6 py-4">{item.toko.nama}</td>
              <td className="px-6 py-4">
                <img src={item.imageUrl} alt={item.nama} className="w-10 h-10 object-cover rounded-full" />
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setIsDialogOpen(true);
                  }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="ml-4 font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to open the dialog for adding a new item */}
      <button
        onClick={() => {
          setNewItem({
            nama: "",
            harga: 0,
            stok: 0,
            tokoId: "",
            imageUrl: "",
          });
          setEditingItem(null);
          setIsDialogOpen(true);
        }}
        className="mt-6 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Add New Item
      </button>

      {/* Dialog for creating or editing an item */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">{editingItem ? "Edit Item" : "Add New Item"}</h3>
            <form onSubmit={editingItem ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-gray-700">Item Name</label>
                <input
                  type="text"
                  value={editingItem ? editingItem.nama : newItem.nama}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, nama: e.target.value });
                    } else {
                      setNewItem({ ...newItem, nama: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={editingItem ? editingItem.harga : newItem.harga}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, harga: e.target.value });
                    } else {
                      setNewItem({ ...newItem, harga: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Stock</label>
                <input
                  type="number"
                  value={editingItem ? editingItem.stok : newItem.stok}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, stok: e.target.value });
                    } else {
                      setNewItem({ ...newItem, stok: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                  min="0"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Toko ID</label>
                <input
                  type="text"
                  value={editingItem ? editingItem.tokoId : newItem.tokoId}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, tokoId: e.target.value });
                    } else {
                      setNewItem({ ...newItem, tokoId: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Item Image URL</label>
                <input
                  type="text"
                  value={editingItem ? editingItem.imageUrl : newItem.imageUrl}
                  onChange={(e) => {
                    if (editingItem) {
                      setEditingItem({ ...editingItem, imageUrl: e.target.value });
                    } else {
                      setNewItem({ ...newItem, imageUrl: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                {editingItem ? "Update Item" : "Add Item"}
              </button>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="ml-4 px-6 py-2 text-white bg-red-600 rounded hover:bg-red-700"
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
