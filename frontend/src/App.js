import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import NewTask from './pages/NewTask';
import AdminTasks from './pages/AdminTasks';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
        <Route path="/tasks" element={<ProtectedRoute role="customer"><Tasks /></ProtectedRoute>} />
        <Route path="/tasks/new" element={<ProtectedRoute role="customer"><NewTask /></ProtectedRoute>} />
        <Route path="/admin/tasks" element={<ProtectedRoute role="admin"><AdminTasks/></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
