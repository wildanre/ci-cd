/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ButtonDelete } from '../components/button';

function Pelaporan() {
    const [pelaporanData, setPelaporanData] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCard, setSelectedCard] = useState(null);
    const itemsPerPage = 4;

    useEffect(() => {
        fetchPelaporan();
    }, [filterStatus, sortOrder]);

    const fetchPelaporan = async () => {
        try {
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

            setPelaporanData(data);
        } catch (error) {
            console.error('Failed to fetch pelaporan:', error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/pelaporan/${id}`, { status: newStatus });
            Swal.fire({
                icon: 'success',
                title: 'Status updated!',
                text: 'The status has been updated successfully.',
            });
            fetchPelaporan();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to update status. Please try again.',
            });
            console.error('Failed to update status:', error);
        }
    };

    const handleDelete = async (id) => {
        // Show confirmation popup before deleting
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/pelaporan/${id}`);
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'The pelaporan has been deleted successfully.',
                });
                fetchPelaporan();
                // Close the modal after deletion
                setSelectedCard(null);
            } catch (error) {
                console.error('Failed to delete pelaporan:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to delete pelaporan. Please try again.',
                });
            }
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

    const closeModal = () => setSelectedCard(null);

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Pelaporan</h1>

            {/* Filter and Sort */}
            <div className="flex flex-wrap items-center gap-4 mb-4 bg-gray-100 p-4 rounded">
                <select
                    value={filterStatus}
                    onChange={(e) => {
                        setFilterStatus(e.target.value);
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
                    }}
                    className="border rounded px-2 py-1"
                >
                    <option value="desc">Terbaru</option>
                    <option value="asc">Terlama</option>
                </select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {paginateData().map((item) => (
                    <div
                        key={item.id}
                        className={`border rounded-xl p-4 shadow ${getStatusBgColor(item.status)} ${
                            selectedCard === item.id ? 'scale-105' : 'scale-95'
                        } transition-transform duration-300 transform`}
                        onClick={() => setSelectedCard(item.id)} // Open modal by setting selected card
                    >
                        <h2 className="text-lg font-bold">{item.judul}</h2>
                        <p className='text-sm font-bold'>{item.name?.name}</p>
                        <p>{item.address}</p>
                        <p className='bg-zinc-100 m-auto text-center w-1/2 rounded-lg'>{item.status}</p>
                        <img
                            src={item.imageUrl}
                            alt={item.judul}
                            className="w-full h-32 object-cover mt-2"
                        />
                        <p className="text-sm text-gray-500">
                            {new Date(item.dateCreated).toLocaleString()}
                        </p>
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

            {/* Modal */}
            {selectedCard && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 modal-overlay"
                    onClick={handleOutsideClick} // Close modal when clicking outside
                >
                    <div className="bg-white p-8 rounded shadow-lg max-w-lg w-full relative">
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-10 right-2 text-gray-100 bg-blue-400 p-2 rounded-lg hover:bg-blue-600"
                        >
                            Close
                        </button>
                        {/* Delete Button */}
                        <ButtonDelete
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(selectedCard);
                            }}
                        >
                        </ButtonDelete>

                        {/* Modal Content */}
                        {pelaporanData
                            .filter((item) => item.id === selectedCard)
                            .map((item) => (
                                <div key={item.id}>
                                    <h2 className="text-2xl font-bold mb-4">{item.judul}</h2>
                                    <p className="text-lg mb-4">{item.description}</p>
                                    <p className="mb-4">Address: {item.address}</p>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.judul}
                                        className="w-full h-64 object-cover mb-4"
                                    />
                                    <p className="text-sm text-gray-500">
                                        {new Date(item.dateCreated).toLocaleString()}
                                    </p>

                                    {/* Status Update */}
                                    <div className="mt-4">
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
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pelaporan;
