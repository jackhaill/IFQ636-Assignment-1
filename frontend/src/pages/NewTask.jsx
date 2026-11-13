import { useLocation } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

const NewTask = () => {
    const location = useLocation();
    const editingTask = location.state?.editingTask || null;

    return (
        <div className="container mx-auto p-6 max-w-2x1">
            <TaskForm editingTask={editingTask} />
        </div>
    );
};

export default NewTask;