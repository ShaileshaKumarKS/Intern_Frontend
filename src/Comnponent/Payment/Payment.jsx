import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const SubscriptionForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return; // Stripe.js has not yet loaded.
        }

        const cardElement = elements.getElement(CardElement);

        // Create a payment method
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        // Send paymentMethod.id and selected plan's Price ID to your server
        const response = await fetch('https://internareabackend-nrg6.onrender.com/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                plan: selectedPlan,
            }),
        });

        const subscriptionData = await response.json();
        if (subscriptionData.error) {
            setError(subscriptionData.error);
        } else {
            alert('Subscription successful!'); // Notify user
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                Subscribe
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default SubscriptionForm;