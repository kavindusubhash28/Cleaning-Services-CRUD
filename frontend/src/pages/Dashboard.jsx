import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaSignOutAlt, FaBroom } from 'react-icons/fa';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';
import bookingbackground from '../../images/bookingbackground.jpg';

const Dashboard = ({ setIsAuthenticated }) => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [bookingsRes, servicesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/bookings', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('http://localhost:5000/api/services')
        ]);
        setBookings(bookingsRes.data);
        setServices(servicesRes.data);
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleCreateBooking = async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setBookings([...bookings, response.data]);
      setShowForm(false);
      toast.success('Booking created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    }
  };

  const handleUpdateBooking = async (id, bookingData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5000/api/bookings/${id}`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setBookings(bookings.map(booking => 
        booking._id === id ? response.data : booking
      ));
      setShowForm(false);
      setEditingBooking(null);
      toast.success('Booking updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update booking');
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.filter(booking => booking._id !== id));
      toast.success('Booking deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete booking');
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${bookingbackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Cleanify Pro</span>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="flex items-center">
                <FaBroom className="h-8 w-8 text-purple-600" />
                <h1 className="ml-3 text-xl font-semibold text-gray-900">Cleaning Service Management</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setEditingBooking(null);
                  setShowForm(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                <FaPlus className="h-4 w-4 mr-2" />
                New Booking
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <FaSignOutAlt className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {showForm && (
            <BookingForm
              services={services}
              onSubmit={editingBooking ? 
                (data) => handleUpdateBooking(editingBooking._id, data) : 
                handleCreateBooking
              }
              onCancel={() => {
                setShowForm(false);
                setEditingBooking(null);
              }}
              initialData={editingBooking}
            />
          )}

          <div className="mb-6 bg-white bg-opacity-80 rounded-lg shadow-md p-6 max-w-md" style={{backdropFilter: 'blur(2px)'}}>
            <h2 className="text-2xl font-semibold text-gray-900">Bookings</h2>
            <p className="mt-1 text-sm text-gray-600">
              Manage your cleaning service bookings
            </p>
          </div>

          <BookingList
            bookings={bookings}
            onEdit={(booking) => {
              setEditingBooking(booking);
              setShowForm(true);
            }}
            onDelete={handleDeleteBooking}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 