/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Impor SweetAlert2
import Spinners from '../../components/Spinners';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      const intervalId = setInterval(async () => {
        const updatedData = await fetchUserData(user.id);
        if (updatedData && JSON.stringify(updatedData) !== JSON.stringify(user)) {
          localStorage.setItem('user', JSON.stringify(updatedData));
          setUser(updatedData);
        }
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [user]);

  const apiUrl = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/login`, { email, password });
      const { message, token, user } = response.data;

      if (message === 'Login successful.') {
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        if (user.role === 'admin') {
          Swal.fire({
            title: 'Login Berhasil!',
            text: 'Login berhasil sebagai admin!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          setTimeout(() => navigate('/'), 2000);
        } else {
          Swal.fire({
            title: 'Hanya Admin yang Bisa Login!',
            text: 'Anda tidak memiliki akses sebagai admin.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { error: errorMessage } = error.response.data;
        if (errorMessage === 'User not found.') {
          Swal.fire({
            title: 'Error!',
            text: 'Email tidak ditemukan. Silakan periksa kembali.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else if (errorMessage === 'Invalid credentials.') {
          Swal.fire({
            title: 'Error!',
            text: 'Password Anda salah. Silakan coba lagi.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          Swal.fire({
            title: 'Login Gagal!',
            text: 'Login gagal. Silakan coba lagi.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } else {
        Swal.fire({
          title: 'Login Gagal!',
          text: 'Login gagal. Silakan coba lagi.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col max-h-screen w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto my-20 px-20 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      {loading && <Spinners />}
      <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">
        <h1 className="text-3xl font-bold text-[#11582d] my-auto">SAVIOR</h1>
      </div>
      <div className="text-sm font-light text-[#6B7280] pb-8 mx-auto">Login ke halaman admin</div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="pb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-3 bg-gray-50 text-gray-600 border border-gray-300 sm:text-sm rounded-lg focus:ring-gray-400 focus:outline-none block w-full p-2.5"
            placeholder="name@company.com"
            autoComplete="off"
            required
          />
        </div>
        <div className="pb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-3 bg-gray-50 text-gray-600 border border-gray-300 sm:text-sm rounded-lg focus:ring-gray-400 focus:outline-none block w-full p-2.5"
            placeholder="Masukkan kata sandi"
            autoComplete="new-password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-[#0acf34] rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
