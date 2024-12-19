import '../assets/css/homePage.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReactECharts from 'echarts-for-react';

export default function HomePage() {

    const barChart = {
        title: {
            text: 'Data Penjualan',
        },
        tooltip: {},
        xAxis: {
            data: ['Beras 1kg', 'Gula pasir 1kg', 'Gula Merah 250g', 'Tepung Terigu 1kg', 'Tepung Tapioka 1kg'],
        },
        yAxis: {},
        series: [
            {
                name: 'Sample Data',
                type: 'bar',
                data: [20, 50, 36, 70, 30],
            },
        ],
    };

    const pieChart = {
        title: {
            text: 'Data Pelaporan',
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: 'Sample Data',
                type: 'pie',
                data: [
                    { value: 20, name: 'Terkirim' },
                    { value: 50, name: 'Diproses' },
                    { value: 36, name: 'Selesai' },
                    { value: 30, name: 'Ditolak' },
                    { value: 70, name: 'Semua Laporan' },
                ],
                radius: '55%',
                center: ['50%', '50%'],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
        ],
    };

    return (
        <div className="page">
            <div className="card-container">
                <div className='card-box hover-card'>
                    <span><ShoppingCartOutlinedIcon /></span>
                    <p>Savior</p>
                    <p>2024</p>
                    <p><b>100 User</b> Sejak terakhir dikunjungi</p>
                </div>
                <div className='card-box hover-card'>
                    <span><ShoppingCartOutlinedIcon /></span>
                    <p>Toko</p>
                    <p>2024</p>
                    <p><b>2 Toko</b> Sejak dibuat</p>
                </div>
            </div>

            <div className='card-container'>
                <div className='card-box'>
                    <ReactECharts option={barChart} />
                </div>
                <div className='card-box'>
                    <ReactECharts option={pieChart} />
                </div>
            </div>
        </div>
    )
}