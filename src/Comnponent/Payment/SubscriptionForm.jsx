import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const SubscriptionForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState(''); // Email input for the user
    const [selectedPlan, setSelectedPlan] = useState(''); // State for selected plan
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

        // Send paymentMethodId, selected plan's Price ID, and email to the backend
        const response = await fetch('https://internareabackend-nrg6.onrender.com/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                plan: selectedPlan, // Price ID of the selected plan
                email: email,
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
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                <option value="">Select a Plan</option>
                <option value="price_1Q6DWKFMGhaCRLSyBjv3AhQ8">Free Plan</option>
                <option value="price_1Q6DcyFMGhaCRLSyuMQ7769W">Bronze Plan</option>
                <option value="price_1Q6DfOFMGhaCRLSyunXaAyeY">Silver Plan</option>
                <option value="price_1Q6DgbFMGhaCRLSyd0BBG1aO">Gold Plan</option>
            </select>
            <br/>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                Subscribe
            </button>
            {error && <div>{error}</div>}
        </form>
    );
};

export default SubscriptionForm;