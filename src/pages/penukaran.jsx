import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PenukaranPage = () => {
  const [penukaran, setPenukaran] = useState([]); // Data untuk tabel
  const [statusFilter, setStatusFilter] = useState(''); // Filter status
  const [dateFrom, setDateFrom] = useState(''); // Filter tanggal dari
  const [dateTo, setDateTo] = useState(''); // Filter tanggal hingga
  const [page, setPage] = useState(1); // Halaman untuk pagination
  const [limit, setLimit] = useState(10); // Batas per halaman

  // Ambil data dari API
  useEffect(() => {
    fetchData();
  }, [statusFilter, dateFrom, dateTo, page]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/penukaran`,
        {
          params: {
            status: statusFilter,
            dateFrom,
            dateTo,
            page,
            limit,
          },
        }
      );
      setPenukaran(response.data);
    } catch (error) {
      console.error('Error fetching penukaran data', error);
    }
  };

  // Update status dengan axios
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/penukaran/${id}`,
        {
          id: id,
          status: newStatus,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      alert(response.data.message); // Tampilkan pesan dari server
      fetchData(); // Perbarui tampilan data setelah status diperbarui
    } catch (error) {
      console.error('Error updating status', error);
      alert('Gagal memperbarui status');
    }
  };

  // Fungsi untuk berpindah ke halaman berikutnya
  const handleNextPage = () => {
    setPage(page + 1);
  };

  // Fungsi untuk berpindah ke halaman sebelumnya
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="container">
      <div className="filters">
        {/* Dropdown filter status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {/* Filter tanggal dari */}
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        {/* Filter tanggal hingga */}
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>

      {/* Tabel Data */}
      <table className="table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Bank Sampah</th>
            <th>Poin yang didapat</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {penukaran.map((item) => (
            <tr key={item.id}>
              <td>{item.userId}</td>
              <td>{item.bankSampahId}</td>
              <td>{item.earned}</td>
              <td>
                {/* Dropdown untuk mengubah status */}
                <select
                  value={item.status}
                  onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="success">Success</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          &lt; Prev
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage} disabled={penukaran.length < limit}>
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default PenukaranPage;
