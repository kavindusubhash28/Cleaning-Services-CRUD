import { useState, useEffect } from 'react';
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaBroom, FaExclamationCircle } from 'react-icons/fa';

const BookingForm = ({ services, onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service: ''
  });

  const [errors, setErrors] = useState({
    customer_name: '',
    address: '',
    date_time: '',
    service: ''
  });

  const [touched, setTouched] = useState({
    customer_name: false,
    address: false,
    date_time: false,
    service: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        customer_name: initialData.customer_name,
        address: initialData.address,
        date_time: new Date(initialData.date_time).toISOString().slice(0, 16),
        service: initialData.service._id
      });
    }
  }, [initialData]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'customer_name':
        if (!value.trim()) {
          error = 'Customer name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters long';
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
          error = 'Name should only contain letters and spaces';
        }
        break;

      case 'address':
        if (!value.trim()) {
          error = 'Address is required';
        } else if (value.trim().length < 5) {
          error = 'Address must be at least 5 characters long';
        }
        break;

      case 'date_time':
        if (!value) {
          error = 'Date and time are required';
        } else {
          const selectedDate = new Date(value);
          const now = new Date();
          if (selectedDate < now) {
            error = 'Please select a future date and time';
          }
          // Validate business hours (8 AM to 6 PM)
          const hours = selectedDate.getHours();
          if (hours < 8 || hours >= 18) {
            error = 'Please select a time between 8 AM and 6 PM';
          }
        }
        break;

      case 'service':
        if (!value) {
          error = 'Please select a service';
        }
        break;

      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      // Set all fields as touched to show errors
      setTouched({
        customer_name: true,
        address: true,
        date_time: true,
        service: true
      });
      return;
    }

    onSubmit(formData);
  };

  const renderError = (error) => {
    return error ? (
      <div className="mt-1 text-sm text-red-600 flex items-center">
        <FaExclamationCircle className="mr-1" />
        {error}
      </div>
    ) : null;
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mb-8 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaBroom className="mr-2 text-purple-600" />
        {initialData ? 'Edit Booking' : 'New Booking'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-1">
              Customer Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="customer_name"
                id="customer_name"
                required
                value={formData.customer_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors duration-200 ${
                  errors.customer_name && touched.customer_name ? 'border-red-500' : ''
                }`}
                placeholder="Enter customer name"
              />
            </div>
            {renderError(touched.customer_name && errors.customer_name)}
          </div>

          <div className="relative">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBroom className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="service"
                id="service"
                required
                value={formData.service}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors duration-200 ${
                  errors.service && touched.service ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name} - ${service.price}
                  </option>
                ))}
              </select>
            </div>
            {renderError(touched.service && errors.service)}
          </div>

          <div className="relative md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                name="address"
                id="address"
                required
                value={formData.address}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                className={`pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors duration-200 ${
                  errors.address && touched.address ? 'border-red-500' : ''
                }`}
                placeholder="Enter service address"
              />
            </div>
            {renderError(touched.address && errors.address)}
          </div>

          <div className="relative md:col-span-2">
            <label htmlFor="date_time" className="block text-sm font-medium text-gray-700 mb-1">
              Date and Time
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="datetime-local"
                name="date_time"
                id="date_time"
                required
                value={formData.date_time}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm transition-colors duration-200 ${
                  errors.date_time && touched.date_time ? 'border-red-500' : ''
                }`}
              />
            </div>
            {renderError(touched.date_time && errors.date_time)}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
          >
            {initialData ? 'Update' : 'Create'} Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm; 