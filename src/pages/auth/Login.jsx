/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
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
            console.log("Fetched user data:", response.data);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
                email,
                password,
            });

            const { message, token, user } = response.data;

            console.log('Login response:', response.data);

            if (message === 'Login successful.') {
                sessionStorage.setItem('authToken', token);
                sessionStorage.setItem('user', JSON.stringify(user));
                setUser(user);
            
                toast.success(`Selamat datang ${user.name}!`);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            console.error('Error logging in:', error);

            if (error.response && error.response.data) {
                const { error: errorMessage } = error.response.data;

                if (errorMessage === 'User not found.') {
                    toast.error('Email tidak ditemukan. Silakan periksa kembali.');
                } else if (errorMessage === 'Invalid credentials.') {
                    toast.error('Password Anda salah. Silakan coba lagi.');
                } else {
                    toast.error('Login gagal. Silakan coba lagi.');
                }
            } else {
                toast.error('Login gagal. Silakan coba lagi.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col h-screen w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto my-20 px-20 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
            {loading && <Spinners />}
            <div className="flex flex-col justify-center mx-auto items-center gap-3 pb-4">

                <h1 className="text-3xl font-bold text-[#11582d] my-auto">SAVIOR</h1>
            </div>
            <div className="text-sm font-light text-[#6B7280] pb-8 mx-auto">Login ke Savior</div>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="pb-2">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#111827]">Email</label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        </span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg"
                            placeholder="name@company.com"
                            autoComplete="off"
                            required
                        />
                    </div>
                </div>
                <div className="pb-6">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#111827]">Password</label>
                    <div className="relative text-gray-400">
                        <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M12 8v8" />
                                <path d="m8.5 14 7-4" />
                                <path d="m8.5 10 7 4" />
                            </svg>
                        </span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg"
                            placeholder="Masukkan kata sandi"
                            autoComplete="new-password"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="w-full text-[#FFFFFF] bg-[#0acf34] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
