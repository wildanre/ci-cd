import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../pages/home'
import Navbar from '../components/navBar'
import HistoryPage from '../pages/history'
import TokoPage from '../pages/toko'
import BarangPage from '../pages/barang'
import UserPage from '../pages/users'
import BankSampahPage from '../pages/bankSampah'
import SampahPage from '../pages/sampah'
import Pelaporan from '../pages/pelaporan'
import PenukaranPage from '../pages/penukaran'
import PembayaranPage from '../pages/pembayaran'

const router = createBrowserRouter([
    {
        element: <Navbar />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/toko",
                element: <TokoPage />
            },
            {
                path: "/barang",
                element: <BarangPage />
            },
            {
                path: "/users",
                element: <UserPage />
            },
            {
                path: "/bankSampah",
                element: <BankSampahPage/>
            },
            {
                path: "/sampah",
                element: <SampahPage />
            },
            {
                path: "/history",
                element: <HistoryPage />
            },
            {
                path: "/pelaporan",
                element: <Pelaporan />
            },
            {
                path: "/penukaran",
                element: <PenukaranPage />
            },
            {
                path: "/pembayaran",
                element: <PembayaranPage />
            },
        ]
    },
])

export default router