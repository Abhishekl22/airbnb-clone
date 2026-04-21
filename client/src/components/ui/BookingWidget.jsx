import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks';
import axiosInstance from '@/utils/axios';
import DatePickerWithRange from './DatePickerWithRange';
import PaymentModal from './PaymentModal';




const BookingWidget = ({ place }) => {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [bookingData, setBookingData] = useState({
    noOfGuests: 1,
    name: '',
    phone: '',
  });
  const [redirect, setRedirect] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const { noOfGuests, name, phone } = bookingData;
  const { _id: id, price } = place;

  useEffect(() => {
    if (user) {
      setBookingData({ ...bookingData, name: user.name });
    }
  }, [user]);

  const numberOfNights =
    dateRange.from && dateRange.to
      ? differenceInDays(
          new Date(dateRange.to).setHours(0, 0, 0, 0),
          new Date(dateRange.from).setHours(0, 0, 0, 0),
        )
      : 0;

  // handle booking form
  const handleBookingData = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!dateRange.from || !dateRange.to) {
      toast.error('Please select check-in and check-out dates');
      return false;
    }
    if (numberOfNights < 1) {
      toast.error('Please select valid dates');
      return false;
    }
    if (noOfGuests < 1) {
      toast.error("Number of guests can't be less than 1");
      return false;
    }
    if (noOfGuests > place.maxGuests) {
      toast.error(`Maximum ${place.maxGuests} guests allowed`);
      return false;
    }
    if (!name.trim()) {
      toast.error("Name can't be empty");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Phone number can't be empty");
      return false;
    }
    return true;
  };

  const handleBooking = async () => {
    if (!user) {
      return setRedirect('/login');
    }

    if (!validateForm()) {
      return;
    }

    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      setIsProcessing(true);
      const bookingDataToSend = {
        place: id,
        checkIn: dateRange.from,
        checkOut: dateRange.to,
        numOfGuests: Number(noOfGuests),
        name,
        phone,
        price: totalPrice,
        paymentId: paymentIntent.id,
        paymentStatus: 'paid',
      };

      const response = await axiosInstance.post('/bookings', bookingDataToSend);
      toast.success('Booking and payment successful!');
      navigate(`/account/bookings/${response.data.booking._id}`);
    } catch (err) {
      console.error('Error saving booking after payment:', err);
      toast.error(err.response?.data?.message || 'Error processing your booking');
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate total price
  const totalPrice = numberOfNights * price;
  
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-xl">
      <div className="text-center text-xl mb-4">
        <span className="font-semibold">${price}</span> / night
      </div>
      
      <div className="mb-4 border rounded-2xl overflow-hidden">
        <div className="p-4">
          <DatePickerWithRange setDateRange={setDateRange} />
        </div>
        
        <div className="border-t p-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <input
            type="number"
            name="noOfGuests"
            className="w-full p-2 border rounded"
            min={1}
            max={place.maxGuests}
            value={noOfGuests}
            onChange={handleBookingData}
          />
          <p className="text-xs text-gray-500 mt-1">Max {place.maxGuests} guests</p>
        </div>
        
        <div className="border-t p-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              value={name}
              onChange={handleBookingData}
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="w-full p-2 border rounded"
              value={phone}
              onChange={handleBookingData}
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>
      
      {numberOfNights > 0 && (
        <div className="mb-4 p-4 border rounded-lg">
          <div className="flex justify-between mb-2">
            <span>${price} x {numberOfNights} nights</span>
            <span>${price * numberOfNights}</span>
          </div>
          <div className="border-t pt-2 font-semibold flex justify-between">
            <span>Total</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      )}
      
      <button
        type="button"
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleBooking}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Book Now'}
      </button>
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={totalPrice}
        bookingId={id}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default BookingWidget;
