import { FaEdit, FaTrash, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaBroom } from 'react-icons/fa';

const BookingList = ({ bookings, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FaBroom className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-800">
                  {booking.service.name}
                </h3>
              </div>
              <span className="px-3 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
                ${booking.service.price}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <FaUser className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{booking.customer_name}</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">{booking.address}</p>
                </div>
              </div>

              <div className="flex items-start">
                <FaCalendarAlt className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="ml-3">
                  <p className="text-sm text-gray-600">{formatDate(booking.date_time)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => onEdit(booking)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              >
                <FaEdit className="h-4 w-4 mr-2" />
                Edit
              </button>
              <button
                onClick={() => onDelete(booking._id)}
                className="inline-flex items-center px-3 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <FaTrash className="h-4 w-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingList; 