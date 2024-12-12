import { useEffect, useState } from "react";
import { ButtonDelete, ButtonEdit } from '../components/button';

export default function BankSampahPage() {
  const [bankSampah, setBankSampah] = useState([]);
  const [newBankSampah, setNewBankSampah] = useState({
    name: "",
    location: "",
    sampah: [],
  });
  const [editingBankSampah, setEditingBankSampah] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch Bank Sampah data from the API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bank-sampah`)
      .then((response) => response.json())
      .then((data) => setBankSampah(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Create new Bank Sampah
  const handleCreate = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/bank-sampah`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBankSampah),
    })
      .then((response) => response.json())
      .then((data) => {
        setBankSampah([...bankSampah, data]);
        setNewBankSampah({ name: "", location: "", sampah: [] });
        setIsDialogOpen(false);
      })
      .catch((error) => console.error("Error creating data:", error));
  };

  // Update Bank Sampah
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/bank-sampah/${editingBankSampah.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingBankSampah),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedBanksampah = bankSampah.map((item) =>
          item.id === data.id ? data : item
        );
        setBankSampah(updatedBanksampah);
        setEditingBankSampah(null);
        setIsDialogOpen(false);
      })
      .catch((error) => console.error("Error updating data:", error));
  };

  // Delete Bank Sampah
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/bank-sampah/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setBankSampah(bankSampah.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  // Handle input changes
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (editingBankSampah) {
      setEditingBankSampah({ ...editingBankSampah, [field]: value });
    } else {
      setNewBankSampah({ ...newBankSampah, [field]: value });
    }
  };

  // Handle sampah items change (splitting comma-separated input)
  const handleSampahChange = (e) => {
    const sampahList = e.target.value.split(",").map((item) => item.trim());
    if (editingBankSampah) {
      setEditingBankSampah({ ...editingBankSampah, sampah: sampahList });
    } else {
      setNewBankSampah({ ...newBankSampah, sampah: sampahList });
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5 py-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nama Bank Sampah</th>
            <th scope="col" className="px-6 py-3">Lokasi</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bankSampah ? bankSampah.map((item) => (
            <tr className="odd:bg-white even:bg-gray-50 border-b" key={item.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.name}
              </th>
              <td className="px-6 py-4">{item.location}</td>
              <td className="px-6 py-4 flex flex-row gap-2">
                <ButtonEdit
                  onClick={() => {
                    setEditingBankSampah(item);
                    setIsDialogOpen(true);
                  }}
                >
                  Edit
                </ButtonEdit>
                <ButtonDelete
                  onClick={() => handleDelete(item.id)}
                >
                </ButtonDelete>
              </td>
            </tr>
          ))
          : (
            <tr>
              <td colSpan={4}>No data available</td>
            </tr>
          )
        }
        </tbody>
      </table>

      {/* Button to open the dialog for adding a new Bank Sampah */}
      <button
        onClick={() => {
          setNewBankSampah({ name: "", location: "", sampah: [] });
          setEditingBankSampah(null);
          setIsDialogOpen(true);
        }}
        className="mt-6 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Add New Bank Sampah
      </button>

      {/* Dialog for creating or editing Bank Sampah */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {editingBankSampah ? "Edit Bank Sampah" : "Add New Bank Sampah"}
            </h3>
            <form onSubmit={editingBankSampah ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-gray-700">Bank Sampah Name</label>
                <input
                  type="text"
                  value={editingBankSampah ? editingBankSampah.name : newBankSampah.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  value={editingBankSampah ? editingBankSampah.location : newBankSampah.location}
                  onChange={(e) => handleInputChange(e, "location")}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Sampah Items (comma separated)</label>
                <input
                  type="text"
                  value={editingBankSampah ? editingBankSampah.sampah.join(", ") : newBankSampah.sampah.join(", ")}
                  onChange={handleSampahChange}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                {editingBankSampah ? "Update Bank Sampah" : "Add Bank Sampah"}
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
