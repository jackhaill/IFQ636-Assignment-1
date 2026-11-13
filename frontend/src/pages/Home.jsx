import { Link } from 'react-router-dom';
import {useAuth } from '../context/AuthContext';

const SERVICES = [
    {
        name: 'Grand Buffet',
        price: 35,
        description: 'A generous spread of hot and cold dishes, carved meats, and dessert table - ideal for large gatherings',
    },
    {
        name: 'Fine Dining',
        price: 55,
        description: 'A seated three-course service with table staff, suited to weddings and formal corporate events.',
    },
    {
        name: 'Cocktail Drink Package',
        price: 28,
        description: 'Large assortment of different cocktails to really get a party going.',
    },
];

const Home = () => {
    const { user } = useAuth();

    return (
        <div className="container mx-auto p-6">
            <div className="text-center mb-10">
            <h1 className="text-3x1 font-bold mb-2">Catering Booking System</h1>
            <p className="text-gray-600">Choose a service below, then submit a booking request for your event.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {SERVICES.map((service) => (
                <div key={service.name} className="bg-white p-6 rounded shadow flex flex-col">
                    <h2 className="text-xl font-bold mp-2">{service.name}</h2>
                    <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                    <p className="text-2x1 font-bold text-blue-600">
                        ${service.price}
                        <span className="text-sm font-normal text-gray-500"> / person</span>
                    </p>
                </div>
            ))}
        </div>

        <div className="text-center">
            {user ? (
                <Link to="/tasks/new" className="bg-blue-600 text-white px-6 py-3 rounded inline-block">
                    Make a booking request
                </Link>
            ) : (
                <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded inline-block">
                    Register to make a booking
                </Link>
            )}
        </div>
    </div>
    );
};

export default Home;