/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ButtonDelete, ButtonCheck, ButtonCancelled } from '../components/button';
function PembayaranPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data pembayaran
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/payment`);
        if (Array.isArray(response.data)) {
          setPayments(response.data);
        } else {
          console.error('Data pembayaran bukan array:', response.data);
          setPayments([]);
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Update status pembayaran
  const handleStatusUpdate = async (id, newStatus, totalPrice) => {
    if (newStatus === 'cancelled') {
      // Hanya ubah status menjadi cancelled tanpa mengubah poin pengguna
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/payment/${id}`, {
          status: newStatus,
          totalPrice,
        });

        alert('Status pembayaran berhasil diubah menjadi cancelled.');
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.id === id ? { ...payment, status: newStatus } : payment
          )
        );
      } catch (error) {
        console.error('Error updating status:', error);
      }
      return; // Menghentikan proses lebih lanjut untuk mengurangi poin jika status adalah cancelled
    }

    // Lakukan update status dan kurangi poin jika statusnya bukan cancelled
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/payment/${id}`, {
        status: newStatus,
        totalPrice,
      });

      if (newStatus === 'success') {
        const user = response.data.payment.user;
        if (user && user.point !== undefined) {
          // Hanya kurangi poin jika statusnya 'success'
          await axios.put(`${import.meta.env.VITE_API_URL}/user/${user.id}`, {
            point: user.point - totalPrice,
          });
        } else {
          console.error('User not found or user points undefined.');
        }
      }

      alert('Status pembayaran berhasil diubah.');
      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment.id === id ? { ...payment, status: newStatus } : payment
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Tambahkan fungsi untuk menghapus pembayaran
  const handleDeletePayment = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pembayaran ini?')) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/payment/${id}`);
      alert('Pembayaran berhasil dihapus.');
      setPayments((prevPayments) => prevPayments.filter((payment) => payment.id !== id));
    } catch (error) {
      console.error('Error deleting payment:', error);
      alert('Gagal menghapus pembayaran.');
    }
  };


  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-5 py-5">
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">Daftar Pembayaran</h1>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs uppercase bg-gray-50 text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">Total harga</th>
            <th scope="col" className="px-6 py-3">User</th>
            <th scope="col" className="px-6 py-3">barang</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(payments) && payments.length > 0 ? (
            payments.map((payment) => (
              <tr className="odd:bg-white even:bg-gray-50 border-b" key={payment.id}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {payment.totalPrice}
                </td>
                <td className="px-6 py-4">{payment.user.name}</td>
                <td className="px-6 py-4">{payment.barang.nama}</td>
                <td className="px-6 py-4">{payment.status}</td>
                <td className="px-6 py-4 flex flex-start gap-2">
                  {payment.status !== 'cancelled' && payment.status !== 'success' && (
                    <div>
                      <ButtonCheck
                      >
                      </ButtonCheck>
                      <ButtonCancelled
                      >
                      </ButtonCancelled>
                    </div>

                  )}
                  <ButtonDelete
                    onClick={() => handleDeletePayment(payment.id)}
                  >
                  </ButtonDelete>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">Tidak ada data pembayaran</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PembayaranPage;
