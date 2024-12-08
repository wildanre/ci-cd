import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/css/navigation.css'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocalFireDepartmentSharpIcon from '@mui/icons-material/LocalFireDepartmentSharp';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import MovingSharpIcon from '@mui/icons-material/MovingSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArchiveIcon from '@mui/icons-material/Archive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Navbar() {
    const [active, setActive] = useState(0)
    const [showDetail, setShowDetail] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [activeMobNav, setAvtiveMobNav] = useState(false)
    const [activeMobTopNav, setAvtiveMobTopNav] = useState(false)
    const navigate = useNavigate()

    function handleButton(i, route) {
        setActive(i)
        setAvtiveMobNav(!activeMobNav)
        navigate(route)
    }

    function handleDetail() {
        setShowDetail(!showDetail)
        setAvtiveMobNav(!activeMobNav)
    }

    function logout() {
        navigate('/login')
    }

    useEffect(() => {
        const handleResize = () => {
            const isMobileDevice = window.innerWidth <= 768; // Set the breakpoint for mobile devices

            setIsMobile(isMobileDevice);
        };
        handleResize();

        const route = ['/', '/toko', '/barang', '/users', '/pelaporan', '/history']
        setActive(route.indexOf(location.pathname))

        // Add event listener to update the screen width on resize
        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className="navbar">
                {isMobile ?
                    <> {activeMobNav && <div className='blur' onClick={handleDetail}></div>}
                        <div className='sideNav-mobile' style={activeMobNav ? { maxWidth: '230px' } : { maxWidth: '0px', padding: '0' }}>
                            <div className='logo' onClick={() => { window.location.reload() }}> <LocalFireDepartmentSharpIcon /> <p>SAVIOR</p></div>
                            <div className='active-container' style={{ top: `${active * 60 + 80}px` }}><div className='active-mob'></div></div>
                            <ul>
                                <li className={active === 0 ? 'activeNav' : null} onClick={() => { handleButton(0, '/') }}><HomeRoundedIcon /> <p>&nbsp; Dashboard</p> </li>
                                <li className={active === 1 ? 'activeNav' : null} onClick={() => { handleButton(1, '/toko') }}><ShoppingBagIcon /> <p>&nbsp; Toko</p></li>
                                <li className={active === 2 ? 'activeNav' : null} onClick={() => { handleButton(2, '/barang') }}><ArchiveIcon /> <p>&nbsp; Barang</p></li>
                                <li className={active === 3 ? 'activeNav' : null} onClick={() => { handleButton(3, '/users') }}><AccountCircleIcon /> <p>&nbsp; Users</p></li>
                                <li className={active === 4 ? 'activeNav' : null} onClick={() => { handleButton(4, '/bankSampah') }}><MovingSharpIcon /> {showDetail && <p>Bank Sampah</p>}</li>
                                <li className={active === 5 ? 'activeNav' : null} onClick={() => { handleButton(5, '/sampah') }}><MovingSharpIcon /> <p>&nbsp; Daftar Sampah</p></li>
                                <li className={active === 6 ? 'activeNav' : null} onClick={() => { handleButton(6, '/pelaporan') }}><pelaporanSharpIcon /> <p>&nbsp; Pelaporan</p></li>
                            </ul>
                        </div></> :
                    <div className='sideNav' style={showDetail ? { width: '230px' } : { width: '70px' }}>
                        <div className='logo' onClick={() => { window.location.reload() }}> <LocalFireDepartmentSharpIcon /> {showDetail && <p>SAVIOR</p>}</div>
                        <div className='active-container' style={{ top: `${active * 60 + 80}px` }}><div className='active'></div></div>
                        <ul>
                            <li className={active === 0 ? 'activeNav' : null} onClick={() => { handleButton(0, '/') }}><HomeRoundedIcon /> {showDetail && <p>Dashboard</p>} </li>
                            <li className={active === 1 ? 'activeNav' : null} onClick={() => { handleButton(1, '/toko') }}><ShoppingBagIcon /> {showDetail && <p>Toko</p>}</li>
                            <li className={active === 2 ? 'activeNav' : null} onClick={() => { handleButton(2, '/barang') }}><ArchiveIcon /> {showDetail && <p>Barang</p>}</li>
                            <li className={active === 3 ? 'activeNav' : null} onClick={() => { handleButton(3, '/users') }}><AccountCircleIcon /> {showDetail && <p>User</p>}</li>
                            <li className={active === 4 ? 'activeNav' : null} onClick={() => { handleButton(4, '/bankSampah') }}><MovingSharpIcon /> {showDetail && <p>Bank Sampah</p>}</li>
                            <li className={active === 5 ? 'activeNav' : null} onClick={() => { handleButton(5, '/sampah') }}><MovingSharpIcon /> {showDetail && <p>Daftar Sampah</p>}</li>
                            <li className={active === 6 ? 'activeNav' : null} onClick={() => { handleButton(6, '/pelaporan') }}><HistorySharpIcon /> {showDetail && <p>Pelaporan</p>}</li>
                        </ul>
                    </div>}
            </div>
            <div className='content' style={isMobile ? null : showDetail ? { width: 'calc(100% - 230px)' } : { width: 'calc(100% - 70px)' }}>
                <div className='topNav'>
                    <button onClick={handleDetail} className='menu'><MenuOutlinedIcon /></button>
                    <div className='topNav-right'>
                        {isMobile ?
                            <button className='menu' onClick={() => { setAvtiveMobTopNav(!activeMobTopNav) }}><MoreVertIcon /></button> :
                            <> <button className='menu'><PersonIcon /></button>
                                <button className='menu'> <SettingsIcon /></button>
                                <button className='menu' onClick={logout}><LogoutSharpIcon /></button></>}
                    </div>
                    {(isMobile && activeMobTopNav) && <div className='popOut-setting'>
                        <button className='menu'><PersonIcon /> &nbsp;Account</button>
                        <button className='menu'> <SettingsIcon /> &nbsp;Setting</button>
                        <button className='menu' onClick={logout}><LogoutSharpIcon /> &nbsp;Logout</button>
                    </div>}
                </div>
                <Outlet />
            </div>
        </>
    )
}