import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const emptyForm = {service: '', guests: '', eventDate: '', notes: '' }

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (editingTask) {
      setFormData({
        service: editingTask.service,
        guests: editingTask.guests,
        eventDate: editingTask.eventDate ? editingTask.eventDate.slice(0, 10) : '',
        notes: editingTask.notes,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (editingTask) {
        await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      }
        setFormData(emptyForm)
        navigate('/tasks', { state: { message: editingTask ? 'Booking updated.' : 'Booking request submitted. Status: Pending'}});
    } catch (error) {
      alert('Failed to save booking.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingTask ? 'Edit booking request' : 'New booking request'}</h1>

      {error && <p className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</p>}
      {success && <p className="mb-4 p-2 bg-green-100 text-green-700 rounded">{success}</p>}

      <label className="block text-sm mb-1">Catering service</label>
      <input
        type="text"
        placeholder="Gourmet Buffet "
        value={formData.service}
        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block text-sm mb-1">Number of guests</label>
      <input
        type="number"
        placeholder="e.g. 30"
        value={formData.guests}
        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block text-sm mb-1">Event date</label>
      <input
        type="date"
        value={formData.eventDate}
        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label className="block text-sm mb-1">Notes (optional)</label>
      <input
        type="text"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTask ? 'Save Changes' : 'Submit Booking'}
      </button>
      <button type="button" onClick={() => navigate ('/tasks')} className="w-full mt-2 bg-gray-300 p-2 rounded"> Back to my bookings</button>
    </form>
  );
};

export default TaskForm;
