import { useState, useEffect } from 'react';
import {useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const AdminTasks = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get('/api/tasks/all', {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setTasks(response.data);
            } catch (error) {
                alert('Failed to fetch bookings.');
            }
        };

        fetchTasks();
    }, [user]);

    const decide = async (taskId, status) => {
        setError('');
        setSuccess('');
        try {
            const response = await axiosInstance.put(
                `/api/tasks/${taskId}/status`,
                { status },
                {headers: { Authorization: `Bearer ${user.token}` } }
            );

            setTasks(tasks.map((task) => (task._id === taskId ? { ...task, status: response.data.status } : task)));
            setSuccess(`Booking ${status.toLowerCase()}.`);
        } catch (error) {
            alert('Could not update the booking.');
        }
    };

    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <h1 className="text-2x1 font-bold mb-4">All booking requests</h1>

            {error && <p className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</p>}
            {success && <p className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</p>}

            {tasks.length === 0 ? (
                <p className="text-gray-500">There are no booking requests yet.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id} className="bg-gray-10 p-4 mb-4 rounded shadow">
                        <div className="flex-justify-between items-center">
                            <h3 className="font-bold">{task.service || 'Old task (no service)'} </h3>
                            <span className={`px-2 py-1 rounded text-sm ${statusStyles[task.status] || ''}`}>
                                {task.status || 'No status'}
                            </span>
                        </div>
                            <p>Customer: {task.userId?.name} ({task.userId?.email})</p>
                            <p>Date: {task.eventDate ? new Date(task.eventDate).toLocaleDateString() : 'No date'}</p>
                            <p>Guests: {task.guests}</p>
                            {task.notes && <p className="text-sm text-gray-600">Notes: {task.notes}</p>}

                            {task.status === 'Pending' && (
                                <div className="mt-2">
                                    <button onClick={() => decide(task._id, 'Approved')}
                                    className="mr-2 bg-green-600 text-white px-4 py-2 rounded"
                                >
                                    Approve
                                    </button>
                                    <button onClick={() => decide(task._id, 'Rejected')}
                                    className="bg red-500 text-white px-4 py-2 rounded"
                                >
                                    Reject
                                    </button>
                                </div>
                            )}
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminTasks;