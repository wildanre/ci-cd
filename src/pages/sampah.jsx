import { useEffect, useState } from "react";
import { ButtonAdd, ButtonDelete, ButtonEdit } from '../components/button';

export default function SampahPage() {
  const [sampah, setSampah] = useState([]);
  const [newSampah, setNewSampah] = useState({
    category: "",
    price: 0,
    bankSampahId: "",
  });
  const [editingSampah, setEditingSampah] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bankSampah, setBankSampah] = useState([]);

  // Fetch sampah from the API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/sampah`)
      .then((response) => response.json())
      .then((data) => setSampah(data));
  }, []);


  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/bank-sampah`)
      .then((response) => response.json())
      .then((data) => setBankSampah(data));
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
            <th scope="col" className="px-6 py-3">Kategori</th>
            <th scope="col" className="px-6 py-3">harga</th>
            <th scope="col" className="px-6 py-3">Bank Sampah</th>
            <th scope="col" className="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sampah.map((item) => (
            <tr className="odd:bg-white even:bg-gray-50 border-b" key={item.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.category}
              </th>
              <td className="px-6 py-4">{item.price}</td>
              <td className="px-6 py-4">
                {item.bankSampah ? item.bankSampah.name : ""}
              </td>
              <td className="px-6 py-4 flex flex-row gap-2">
                <ButtonEdit
                  onClick={() => {
                    setEditingSampah(item);
                    setIsDialogOpen(true);
                  }}
                />
                <ButtonDelete
                  onClick={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <ButtonAdd
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

      </ButtonAdd>

      {/* Dialog for creating or editing sampah */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {editingSampah ? "Edit Sampah" : "Tambah Sampah"}
            </h3>
            <form onSubmit={editingSampah ? handleUpdate : handleCreate}>
              <div className="mb-4">
                <label className="block text-gray-700">Kategori</label>
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
                <label className="block text-gray-700">Harga</label>
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
                <label className="block text-gray-700">Nama Bank Sampah</label>
                <select
                  value={editingSampah ? editingSampah.bankSampahId : newSampah.bankSampahId}
                  onChange={(e) => {
                    if (editingSampah) {
                      setEditingSampah({ ...editingSampah, bankSampahId: e.target.value });
                    } else {
                      setNewSampah({ ...newSampah, bankSampahId: e.target.value });
                    }
                  }}
                  className="mt-1 px-4 py-2 border rounded"
                >
                  <option value="" className="block text-gray-700">
                    Pilih Bank Sampah
                  </option>
                  {bankSampah.map((bank) => (
                    <option key={bank.id} value={bank.id}>
                      {bank.name}
                    </option>
                  ))}
                </select>
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
