import ReactECharts from 'echarts-for-react';

export default function GrowthPage() {
    const option = {
        title: {
            text: 'Growth in a year',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Increase', 'Decrease'],
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: ["January", "February", "Maret", "April", "May", "June", "July", "August", "September", "October", "November", 'December']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Last Month',
                type: 'bar',
                stack: 'data',
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
            },
            {
                name: 'Increase',
                type: 'bar',
                stack: 'data',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
            },
            {
                name: 'Decrease',
                type: 'bar',
                stack: 'data',
                label: {
                    normal: {
                        show: true,
                        position: 'bottom'
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgb(249,76,91)',
                        color: 'rgb(249,76,91)'
                    },
                    emphasis: {
                        barBorderColor: 'rgb(249,76,91)',
                        color: 'rgb(249,76,91)'
                    }
                },
                data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
            }
        ]
    };

    const option1 = {
        title: {
            text: 'Growth in the last 10 years',
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['Increase', 'Decrease'],
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019"]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Last Month',
                type: 'bar',
                stack: 'data',
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    },
                    emphasis: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
            },
            {
                name: 'Increase',
                type: 'bar',
                stack: 'data',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                data: [900, 345, 393, '-', '-', 135, 178, 286, '-', '-', '-']
            },
            {
                name: 'Decrease',
                type: 'bar',
                stack: 'data',
                label: {
                    normal: {
                        show: true,
                        position: 'bottom'
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderColor: 'rgb(249,76,91)',
                        color: 'rgb(249,76,91)'
                    },
                    emphasis: {
                        barBorderColor: 'rgb(249,76,91)',
                        color: 'rgb(249,76,91)'
                    }
                },
                data: ['-', '-', '-', 108, 154, '-', '-', '-', 119, 361, 203]
            }
        ]
    };
    return (
        <div className='page'>
            <div className='card-box' style={{marginBottom: '10px'}}>
                <ReactECharts option={option} />
            </div>
            <div className='card-box'>
                <ReactECharts option={option1} />
            </div>
        </div>
    )
}