import  { useEffect, useState } from 'react';
import axios from 'axios';

function Pelaporan() {
    const [pelaporanData, setPelaporanData] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Ambil data dari sessionStorage jika ada
    useEffect(() => {
        fetchPelaporan();
    }, [filterStatus, sortOrder]);

    const fetchPelaporan = async () => {
        try {
            const cachedData = sessionStorage.getItem('pelaporanData');
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                setPelaporanData(parsedData);
                return;
            }

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/pelaporan`);
            let data = response.data;

            if (filterStatus) {
                data = data.filter((item) => item.status === filterStatus);
            }

            data = data.sort((a, b) => {
                const dateA = new Date(a.dateCreated);
                const dateB = new Date(b.dateCreated);
                return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
            });

            // Simpan ke sessionStorage
            sessionStorage.setItem('pelaporanData', JSON.stringify(data));
            setPelaporanData(data);
        } catch (error) {
            console.error('Failed to fetch pelaporan:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/pelaporan/${id}`, { status: newStatus });
            alert('Status updated successfully.');
            fetchPelaporan();
        } catch (error) {
            alert('Failed to update status.');
            console.error('Failed to update status:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/pelaporan/${id}`);
            alert('Pelaporan deleted successfully.');
            fetchPelaporan();
        } catch (error) {
            console.error('Failed to delete pelaporan:', error);
            alert('Failed to delete pelaporan. Please try again.');
        }
    };

    const getStatusBgColor = (status) => {
        switch (status) {
            case 'sent':
                return 'bg-blue-200';
            case 'reviewed':
                return 'bg-yellow-200';
            case 'completed':
                return 'bg-green-200';
            case 'rejected':
                return 'bg-red-200';
            default:
                return 'bg-gray-200';
        }
    };

    const paginateData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return pelaporanData.slice(startIndex, startIndex + itemsPerPage);
    };

    const totalPages = Math.ceil(pelaporanData.length / itemsPerPage);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Pelaporan</h1>

            {/* Filter and Sort */}
            <div className="flex flex-wrap items-center gap-4 mb-4 bg-gray-100 p-4 rounded">
                <select
                    value={filterStatus}
                    onChange={(e) => {
                        setFilterStatus(e.target.value);
                        sessionStorage.removeItem('pelaporanData');
                    }}
                    className="border rounded px-2 py-1"
                >
                    <option value="">Filter by Status</option>
                    <option value="sent">Sent</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => {
                        setSortOrder(e.target.value);
                        sessionStorage.removeItem('pelaporanData');
                    }}
                    className="border rounded px-2 py-1"
                >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginateData().map((item) => (
                    <div
                        key={item.id}
                        className={`border rounded p-4 shadow ${getStatusBgColor(item.status)}`}
                    >
                        <h2 className="text-lg font-bold">{item.judul}</h2>
                        
                        <p>{item.address}</p>
                        <p>{item.description}</p>
                        <img
                            src={item.imageUrl}
                            alt={item.judul}
                            className="w-full h-32 object-cover mt-2"
                        />
                        <p className="text-sm text-gray-500">
                            {new Date(item.dateCreated).toLocaleString()}
                        </p>

                        <div className="mt-2">
                            <select
                                value={item.status}
                                onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                className="border rounded px-2 py-1"
                            >
                                <option value="sent">Sent</option>
                                <option value="reviewed">Reviewed</option>
                                <option value="completed">Completed</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    &lt; Prev
                </button>

                <span>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
}

export default Pelaporan;
