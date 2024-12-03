import { useEffect, useState } from "react";

export default function SampahPage() {
  const [sampah, setSampah] = useState([]);
  const [newSampah, setNewSampah] = useState({
    category: "",
    price: 0,
    bankSampahId: "",
  });
  const [editingSampah, setEditingSampah] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch sampah from the API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/sampah`)
      .then((response) => response.json())
      .then((data) => setSampah(data));
  }, []);

  // Create new sampah
  const handleCreate = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/sampah`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSampah),
    })
      .then((response) => response.json())
      .then((data) => {
        setSampah([...sampah, data]);
        setNewSampah({
          category: "",
          price: 0,
          bankSampahId: "",
        });
        setIsDialogOpen(false);
      });
  };

  // Update sampah
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`${import.meta.env.VITE_API_URL}/sampah/${editingSampah.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingSampah),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedSampah = sampah.map((item) =>
          item.id === data.id ? data : item
        );
        setSampah(updatedSampah);
        setEditingSampah(null);
        setIsDialogOpen(false);
      });
  };

  // Delete sampah
  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/sampah/${id}`, {
      method: "DELETE",
    }).then(() => {
      setSampah(sampah.filter((item) => item.id !== id));
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5 py-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3">Price</th>
            <th scope="col" className="px-6 py-3">Bank Sampah</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sampah.map((item) => (
            <tr className="odd:bg-white even:bg-gray-50 border-b" key={item.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.category}
              </th>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">{item.bankSampahId}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    setEditingSampah(item);
                    setIsDialogOpen(true);
                  }}
                  className="font-medium text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to open the dialog for adding a new sampah */}
      <button
        onClick={() => {
          setNewSampah({
            category: "",
            price: 0,
            bankSampahId: "",
          });
          setEditingSampah(null);
          setIsDialogOpen(true);
        }}
        className="mt-6 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Add New Sampah
      </button>

      {/* Dialog for creating or editing sampah */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {editingSampah ? "Edit Sampah" : "Add New Sampah"}
            </h3>
            <form onSubmit={editingSampah ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-gray-700">Category</label>
                <input
                  type="text"
                  value={editingSampah ? editingSampah.category : newSampah.category}
                  onChange={(e) => {
                    if (editingSampah) {
                      setEditingSampah({ ...editingSampah, category: e.target.value });
                    } else {
                      setNewSampah({ ...newSampah, category: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={editingSampah ? editingSampah.price : newSampah.price}
                  onChange={(e) => {
                    if (editingSampah) {
                      setEditingSampah({ ...editingSampah, price: +e.target.value });
                    } else {
                      setNewSampah({ ...newSampah, price: +e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Bank Sampah ID</label>
                <input
                  type="text"
                  value={editingSampah ? editingSampah.bankSampahId : newSampah.bankSampahId}
                  onChange={(e) => {
                    if (editingSampah) {
                      setEditingSampah({ ...editingSampah, bankSampahId: e.target.value });
                    } else {
                      setNewSampah({ ...newSampah, bankSampahId: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                {editingSampah ? "Update Sampah" : "Add Sampah"}
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
