import '../assets/css/homePage.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReactECharts from 'echarts-for-react';

export default function HomePage() {

    const barChart = {
        title: {
            text: 'Sample Bar Chart',
        },
        tooltip: {},
        xAxis: {
            data: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
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
            text: 'Sample Bar Chart',
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
                    { value: 20, name: 'Category 1' },
                    { value: 50, name: 'Category 2' },
                    { value: 36, name: 'Category 3' },
                    { value: 70, name: 'Category 4' },
                    { value: 30, name: 'Category 5' },
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
                    <p>ABCs</p>
                    <p>2023</p>
                    <p><b>3 new</b> Since last visit</p>
                </div>
                <div className='card-box hover-card'>
                    <span><ShoppingCartOutlinedIcon /></span>
                    <p>ABCs</p>
                    <p>2023</p>
                    <p><b>3 new</b> Since last visit</p>
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