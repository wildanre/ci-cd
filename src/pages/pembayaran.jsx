import { useState, useEffect } from 'react';
import axios from 'axios';

function PembayaranPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data pembayaran
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/payment`);
        // Pastikan response.data adalah array
        if (Array.isArray(response.data)) {
          setPayments(response.data);
        } else {
          console.error('Data pembayaran bukan array:', response.data);
          setPayments([]); // Menetapkan pembayaran kosong jika data tidak valid
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
        setPayments([]); // Menangani error dengan pembayaran kosong
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  // Update status pembayaran
  const handleStatusUpdate = async (id, newStatus, pointsUsed) => {
    console.log(`Sending PUT request to: ${import.meta.env.VITE_API_URL}/payment/${id}`);
    console.log(`Data:`, { status: newStatus, pointsUsed });

    if (newStatus === 'cancelled') {
      alert('Status sudah cancelled, tidak bisa diubah lagi.');
      return;
    }

    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/payment/${id}`, { status: newStatus, pointsUsed });
      console.log('Response:', response); // Log response from server
      if (newStatus === 'success') {
        await axios.put(`${import.meta.env.VITE_API_URL}/user/${response.data.payment.userId}`, {
          point: response.data.payment.user.point - pointsUsed,
        });
      }

      alert('Status pembayaran berhasil diubah.');
      setPayments(prevPayments =>
        prevPayments.map(payment =>
          payment.id === id ? { ...payment, status: newStatus } : payment
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal mengubah status pembayaran.');
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Daftar Pembayaran</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(payments) && payments.length > 0 ? (
            payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.user.name}</td>
                <td>{payment.status}</td>
                <td>
                  {payment.status !== 'cancelled' && (
                    <>
                      <button onClick={() => handleStatusUpdate(payment.id, 'success', payment.pointsUsed)}>
                        Mark as Success
                      </button>
                      <button onClick={() => handleStatusUpdate(payment.id, 'cancelled', payment.pointsUsed)}>
                        Mark as Cancelled
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Tidak ada data pembayaran</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PembayaranPage;
