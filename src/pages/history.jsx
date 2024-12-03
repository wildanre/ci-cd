import '../assets/css/historyPage.css'
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import { useState } from 'react';

export default function HistoryPage() {
    const [activePage, setActivePage] = useState(1)

    function changePage(page) {
        setActivePage(page)
    }

    const data = { totalPage: 12 }
    return (
        <div className='page'>
            <div className='card-box'>
                <p className='title'><HistorySharpIcon /><b>History</b></p>
                <table className='history'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>28/12/23</td>
                            <td>Answer comments from Ria</td>
                        </tr>
                        <tr>
                            <td>22/12/23</td>
                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, libero!</td>
                        </tr>
                        <tr>
                            <td>19/12/23</td>
                            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='center'>
                <div className='pagination'>
                    {activePage > 1 && <><KeyboardDoubleArrowLeftOutlinedIcon onClick={() => { changePage(1) }} />
                        <ChevronLeftOutlinedIcon onClick={() => { changePage(activePage - 1) }} /></>}
                    {data.totalPage > 5 ?
                        <>
                            {[...Array(data.totalPage - 4 >= activePage ? 3 : 5)].map((_, i) => {
                                if (activePage >= data.totalPage - 4) return <span onClick={() => changePage(data.totalPage - 4 + i)} className={data.totalPage - 4 + i === activePage ? 'active-page' : ''} key={i}>{data.totalPage - 4 + i}</span>
                                else if (activePage > 1) return <span onClick={() => changePage(activePage - 1 + i)} className={activePage - 1 + i === activePage ? 'active-page' : ''} key={i}>{activePage - 1 + i}</span>
                                else return <span key={i} onClick={() => changePage(i + 1)} className={i + 1 === activePage ? 'active-page' : ''}>{i + 1}</span>
                            })}
                            {data.totalPage - 4 >= activePage &&
                                <><p>...</p>
                                    <span onClick={() => changePage(data.totalPage)} className={data.totalPage === activePage ? 'active-page' : ''}>{data.totalPage}</span></>
                            }
                        </> :
                        [...Array(5)].map((_, i) => {
                            return <span onClick={() => changePage(i + 1)} className={i + 1 === activePage ? 'active-page' : ''}>{i + 1}</span>
                        })
                    }
                    {activePage < data.totalPage && <><KeyboardArrowRightOutlinedIcon onClick={() => { changePage(activePage + 1) }} />
                        <KeyboardDoubleArrowRightOutlinedIcon onClick={() => { changePage(data.totalPage) }} /></>}
                </div>
            </div>
        </div>
    )
}