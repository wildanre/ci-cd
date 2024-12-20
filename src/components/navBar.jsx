/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import '../assets/css/navigation.css';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalFireDepartmentSharpIcon from '@mui/icons-material/LocalFireDepartmentSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArchiveIcon from '@mui/icons-material/Archive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ReportIcon from '@mui/icons-material/Report';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useState, useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from 'sweetalert2';

export default function Navbar() {
    const [active, setActive] = useState(0);
    const [showDetail, setShowDetail] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [activeMobNav, setAvtiveMobNav] = useState(false);
    const [activeMobTopNav, setAvtiveMobTopNav] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Use location to detect current path

    const routes = ['/', '/toko', '/barang', '/users', '/bankSampah', '/sampah', '/pelaporan', '/penukaran', '/pembayaran'];

    function logout() {
        Swal.fire({
            title: 'Anda yakin ingin keluar?',
            text: 'Semua sesi Anda akan diakhiri.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, keluar!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('authToken');
                sessionStorage.removeItem('user');

                Swal.fire({
                    title: 'Logout Berhasil!',
                    text: 'Anda telah keluar dari akun.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                });

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        });
    }
    function handleButton(i, route) {
        setActive(i);
        setAvtiveMobNav(!activeMobNav);
        navigate(route);
    }

    function handleDetail() {
        setShowDetail(!showDetail);
        setAvtiveMobNav(!activeMobNav);
    }

    useEffect(() => {
        const handleResize = () => {
            const isMobileDevice = window.innerWidth <= 768;
            setIsMobile(isMobileDevice);
        };
        handleResize();


        setActive(routes.indexOf(location.pathname));

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [location.pathname]);

    return (
        <>
            <div className="navbar">
                {isMobile ? (
                    <>
                        {activeMobNav && <div className='blur' onClick={handleDetail}></div>}
                        <div className='sideNav-mobile' style={activeMobNav ? { maxWidth: '230px' } : { maxWidth: '0px', padding: '0' }}>
                            <div className='logo' onClick={() => { window.location.reload() }}> <LocalFireDepartmentSharpIcon /> <p>SAVIOR</p></div>
                            <div className='active-container' style={{ top: `${active * 60 + 80}px` }}><div className='active-mob'></div></div>
                            <ul>
                                <li className={active === 0 ? 'activeNav' : null} onClick={() => { handleButton(0, '/') }}><HomeRoundedIcon /> <p>&nbsp; Dashboard</p></li>
                                <li className={active === 1 ? 'activeNav' : null} onClick={() => { handleButton(1, '/toko') }}><ShoppingBagIcon /> <p>&nbsp; Toko</p></li>
                                <li className={active === 2 ? 'activeNav' : null} onClick={() => { handleButton(2, '/barang') }}><ArchiveIcon /> <p>&nbsp; Barang</p></li>
                                <li className={active === 3 ? 'activeNav' : null} onClick={() => { handleButton(3, '/users') }}><AccountCircleIcon /> <p>&nbsp; Users</p></li>
                                <li className={active === 4 ? 'activeNav' : null} onClick={() => { handleButton(4, '/bankSampah') }}><CollectionsBookmarkIcon /> <p>&nbsp; Bank Sampah</p></li>
                                <li className={active === 5 ? 'activeNav' : null} onClick={() => { handleButton(5, '/sampah') }}><DeleteSweepIcon /> <p>&nbsp; Daftar Sampah</p></li>
                                <li className={active === 6 ? 'activeNav' : null} onClick={() => { handleButton(6, '/pelaporan') }}><ReportIcon /> <p>&nbsp; Pelaporan</p></li>
                                <li className={active === 7 ? 'activeNav' : null} onClick={() => { handleButton(7, '/penukaran') }}><SwapHorizontalCircleIcon /> <p>&nbsp; Penukaran</p></li>
                                <li className={active === 8 ? 'activeNav' : null} onClick={() => { handleButton(8, '/pembayaran') }}><PaymentsIcon /> <p>&nbsp; Pembayaran</p></li>
                            </ul>
                        </div>
                    </>
                ) : (
                    <div className='sideNav' style={showDetail ? { width: '230px' } : { width: '70px' }}>
                        <div className='logo' onClick={() => { window.location.reload() }}> <LocalFireDepartmentSharpIcon /> {showDetail && <p>SAVIOR</p>}</div>
                        <div className='active-container' style={{ top: `${active * 60 + 80}px` }}><div className='active'></div></div>
                        <ul>
                            <li className={active === 0 ? 'activeNav' : null} onClick={() => { handleButton(0, '/') }}><HomeRoundedIcon /> {showDetail && <p>Dashboard</p>} </li>
                            <li className={active === 1 ? 'activeNav' : null} onClick={() => { handleButton(1, '/toko') }}><ShoppingBagIcon /> {showDetail && <p>Toko</p>}</li>
                            <li className={active === 2 ? 'activeNav' : null} onClick={() => { handleButton(2, '/barang') }}><ArchiveIcon /> {showDetail && <p>Barang</p>}</li>
                            <li className={active === 3 ? 'activeNav' : null} onClick={() => { handleButton(3, '/users') }}><AccountCircleIcon /> {showDetail && <p>User</p>}</li>
                            <li className={active === 4 ? 'activeNav' : null} onClick={() => { handleButton(4, '/bankSampah') }}><CollectionsBookmarkIcon /> {showDetail && <p>Bank Sampah</p>}</li>
                            <li className={active === 5 ? 'activeNav' : null} onClick={() => { handleButton(5, '/sampah') }}><DeleteSweepIcon /> {showDetail && <p>Daftar Sampah</p>}</li>
                            <li className={active === 6 ? 'activeNav' : null} onClick={() => { handleButton(6, '/pelaporan') }}><ReportIcon /> {showDetail && <p>Pelaporan</p>}</li>
                            <li className={active === 7 ? 'activeNav' : null} onClick={() => { handleButton(7, '/penukaran') }}><SwapHorizontalCircleIcon /> {showDetail && <p>Penukaran</p>}</li>
                            <li className={active === 8 ? 'activeNav' : null} onClick={() => { handleButton(8, '/pembayaran') }}><PaymentsIcon /> {showDetail && <p>Pembayaran</p>}</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className='content' style={isMobile ? null : showDetail ? { width: 'calc(100% - 230px)' } : { width: 'calc(100% - 70px)' }}>
                <div className='topNav'>
                    <button onClick={handleDetail} className='menu'><MenuOutlinedIcon /></button>
                    <div className='topNav-right'>
                        {isMobile ? (
                            <button className='menu' onClick={() => { setAvtiveMobTopNav(!activeMobTopNav) }}><MoreVertIcon /></button>
                        ) : (
                            <>
                                <button className='menu' onClick={logout}>
                                    <LogoutSharpIcon />
                                </button>

                            </>
                        )}
                    </div>
                    {(isMobile && activeMobTopNav) && <div className='popOut-setting'>
                        <button className='menu' onClick={logout}>
                            <LogoutSharpIcon /> &nbsp;Logout
                        </button>
                    </div>}
                </div>
                <Outlet />
            </div>
        </>
    );
}
