import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axiosInstance from '@/utils/axios';
import { toast } from 'react-toastify';

// ✅ Your Stripe publishable key (from Stripe Dashboard)
const stripePromise = loadStripe("pk_test_51QAPYuA9rIfqkqdh1WKQN5UkcXpNhsVCS4ENOEBJryS2PWLvHqerWeh8i0J41lMUgBHQHUcPbb8nCAmhX6H39Asl0076nhWLfZ");


// ----------------------------
// Checkout Form Component
// ----------------------------
const CheckoutForm = ({ amount, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {}, // No redirect; handled inline
      redirect: 'if_required',
    });

    if (error) {
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast.success('✅ Payment Successful!');
      onSuccess(paymentIntent);
      onClose();
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition"
      >
        {loading ? 'Processing...' : `Pay ₹${amount}`}
      </button>
    </form>
  );
};


// ----------------------------
// Payment Modal Component
// ----------------------------
const PaymentModal = ({ isOpen, onClose, amount, onPaymentSuccess }) => {
  const [clientSecret, setClientSecret] = useState('');

  // ✅ Correct useEffect usage (not useState)
  useEffect(() => {
    if (isOpen && amount > 0) {
      axiosInstance.post('/api/payment/create-payment-intent', { amount })

      .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error('Error initializing payment:', err);
          toast.error('Failed to initialize payment. Please try again.');
        });
    }
  }, [isOpen, amount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-3 text-center">Complete Your Payment</h2>
        <p className="text-gray-600 text-center mb-4">Amount: ₹{amount}</p>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              amount={amount}
              onSuccess={onPaymentSuccess}
              onClose={onClose}
            />
          </Elements>
        ) : (
          <p className="text-center text-gray-500">Loading payment form...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
