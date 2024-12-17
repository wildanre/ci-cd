/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ButtonCheck, ButtonCancelled, ButtonDelete } from '../components/button'

const Penukaran = () => {
  const [penukarans, setPenukarans] = useState([]);
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // Ambil data penukaran dengan filter status dan tanggal
  useEffect(() => {
    fetchPenukarans();
  }, [status, dateFrom, dateTo, page]);

  const fetchPenukarans = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/penukaran?status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&limit=${limit}`);
      const data = await response.json();

      if (Array.isArray(data)) {
        setPenukarans(data); // Update state jika data adalah array
      } else {
        console.error("Data yang diterima bukan array", data);
      }
    } catch (error) {
      console.error("Gagal mengambil data penukaran", error);
    }
  };

  // Fungsi untuk memperbarui status penukaran
  const updateStatus = async (e, newStatus, penukaran) => {
    e.preventDefault();
    if (!newStatus) return;

    // Ensure 'earned' is valid or provide a default value
    const earnedValue = penukaran?.earned || 0; // Default to 0 if 'earned' is not available

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/penukaran/${penukaran.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, earned: earnedValue }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        return alert('Terjadi kesalahan saat memperbarui status.');
      }

      const data = await response.json();

      if (data.error) {
        console.error("Error details:", data.error);
        alert(`Error: ${data.error}`);
      } else {
        alert('Status berhasil diperbarui!');
        fetchPenukarans(); // Refresh the data
      }
    } catch (error) {
      console.error("Gagal memperbarui status", error);
      alert('Terjadi kesalahan pada server.');
    }
  };


  // Fungsi untuk menghapus penukaran
  const deletePenukaran = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/penukaran/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Penukaran berhasil dihapus!');
      fetchPenukarans(); // Refresh data penukaran
    } else {
      alert('Gagal menghapus penukaran');
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5 py-5">
      <h1 className="text-2xl font-bold mb-4">Konfirmasi Penukaran</h1>

      {/* Filter Form */}
      <div className="mb-4">
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="ml-2 p-2 border border-gray-300"
        >
          <option value="">Semua</option>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <label className="ml-4">Dari Tanggal:</label>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="ml-2 p-2 border border-gray-300"
        />

        <label className="ml-4">Hingga Tanggal:</label>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="ml-2 p-2 border border-gray-300"
        />
      </div>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nama</th>
            <th scope="col" className="px-6 py-3">Kategori</th>
            <th scope="col" className="px-6 py-3">Bank Sampah</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Dibuat</th>
            <th scope="col" className="px-6 py-3">Diubah</th>
            <th scope="col" className="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {penukarans.map((penukaran) => (
            <tr key={penukaran.id} className="odd:bg-white even:bg-gray-50 border-b">
              <td className="px-6 py-4">{penukaran.name?.name || '-'}</td>
              <td className="px-6 py-4">{penukaran.category?.category || '-'}</td>
              <td className="px-6 py-4">{penukaran.bankSampah?.name || '-'}</td>
              <td className="px-6 py-4">{penukaran.status}</td>
              <td className="px-6 py-4">{format(new Date(penukaran.dateCreated), 'yyyy-MM-dd HH:mm')}</td>
              <td className="px-6 py-4">{format(new Date(penukaran.dateUpdated), 'yyyy-MM-dd HH:mm')}</td>
              <td className="px-6 py-4 flex flex-start gap-2">
                {penukaran.status === 'pending' && (
                  <>
                    <ButtonCheck
                      onClick={(e) => updateStatus(e, 'success', penukaran)}
                    />
                    <ButtonCancelled
                      onClick={(e) => updateStatus(e, 'cancelled', penukaran)}
                    />
                  </>
                )}
                <ButtonDelete
                  onClick={() => deletePenukaran(penukaran.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Penukaran;
