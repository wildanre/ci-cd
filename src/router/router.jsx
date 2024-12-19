import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import Navbar from '../components/navBar';
import HistoryPage from '../pages/history';
import TokoPage from '../pages/toko';
import BarangPage from '../pages/barang';
import UserPage from '../pages/users';
import BankSampahPage from '../pages/bankSampah';
import SampahPage from '../pages/sampah';
import Pelaporan from '../pages/pelaporan';
import PenukaranPage from '../pages/penukaran';
import PembayaranPage from '../pages/pembayaran';
import Login from '../pages/auth/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <Navbar />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/toko",
                element: (
                    <ProtectedRoute>
                        <TokoPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/barang",
                element: (
                    <ProtectedRoute role="admin">
                        <BarangPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/users",
                element: (
                    <ProtectedRoute role="admin">
                        <UserPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/bankSampah",
                element: (
                    <ProtectedRoute>
                        <BankSampahPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/sampah",
                element: (
                    <ProtectedRoute>
                        <SampahPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/history",
                element: (
                    <ProtectedRoute>
                        <HistoryPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/pelaporan",
                element: (
                    <ProtectedRoute>
                        <Pelaporan />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/penukaran",
                element: (
                    <ProtectedRoute>
                        <PenukaranPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/pembayaran",
                element: (
                    <ProtectedRoute>
                        <PembayaranPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

export default router;
