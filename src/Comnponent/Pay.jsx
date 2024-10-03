import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(' pk_test_51Q53EfFMGhaCRLSyxu0TfEjRjVWzHrYtqCfRryFb2m6QHDqAPA3seLGUq3bGbIYTZUxJluchzzDQNlJFCvdTmc0g00H2rICfih');  // Replace with your Stripe Publishable Key

const Checkout = ({ plan, userEmail }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!stripe||!elements){
      return;
    }


    // Get the card details from the form
    const card = elements.getElement(CardElement);
    if(!card){
        console.log("CardElement not found");
        setError("Unable to find the card details");
        return;
    }
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Call backend to create payment intent
    try {
      const { data } = await axios.post('https://internareabackend-nrg6.onrender.com/api/create-payment-intent', {
        payment_method: paymentMethod.id,
        plan,
      });

      const { client_secret } = data;

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(client_secret);

      if (confirmError) {
        setError(confirmError.message);
      } else {
        setSuccess(true);

        // Trigger email sending after successful payment
        await axios.post('https://internareabackend-nrg6.onrender.com/api/send-email', {
          plan,
          paymentIntent,
          userEmail,
        });

        alert('Payment successful! An invoice has been sent to your email.');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Payment failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <CardElement />
      
      <button type="submit" disabled={!stripe || success}>
        Subscribe to {plan.name} Plan
      </button>
      {error && <p>{error}</p>}
      {success && <p>Payment successful!</p>}
    </form>
  );
};

const CheckoutPage = ({ userEmail }) => {
  const plans = [
    { name: 'Free', price: 0, maxApplications: 1 },
    { name: 'Bronze', price: 100, maxApplications: 3 },
    { name: 'Silver', price: 300, maxApplications: 5 },
    { name: 'Gold', price: 1000, maxApplications: 'Unlimited' }
  ];

  return (
    <div>
      {plans.map(plan => (
        <div key={plan.name}>
          <h2>{plan.name} Plan</h2>
          <p>Price: ₹{plan.price}/month</p>
          <p>Max Applications: {plan.maxApplications}</p>
         <Elements stripe={stripePromise}> <Checkout plan={plan} userEmail={userEmail} /></Elements>
        </div>
      ))}
    </div>
  );
};

export default CheckoutPage;