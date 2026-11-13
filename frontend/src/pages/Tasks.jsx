import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    if (location.state?.message) {
      navigate('/tasks', {replace: true, state: {} });
    }
  }, []);
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/api/tasks', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(response.data);
      } catch (error) {
        alert('Failed to fetch bookings.');
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2x1 font-bold">My bookings</h1>
        <Link to="tasks/new" className="bg-blue-600 text-white px-4 py-2 rounded">New booking request</Link>
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default Tasks;
