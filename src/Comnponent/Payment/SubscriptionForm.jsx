import React, { useState } from 'react';
import { useStripe, useElements, CardElement,} from '@stripe/react-stripe-js';
import './Subscription.css'

const SubscriptionForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [email, setEmail] = useState(''); 
    const [selectedPlan, setSelectedPlan] = useState(''); 
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const PaymentTime=()=>{
    const now=new Date();
    const currentHourIST=now.getUTCHours()+5.5;
    let hour=Math.floor(currentHourIST%24);
    if(hour>=10 && hour<=11){
        
        return;
    }else{
        alert("Sorry, Subscriptions & Payments are only allowed between 10AM to 11AM IST.")
    
    }
}

    const handleSubmit = async (event) => {
        event.preventDefault();
         

        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            
            return; 
            
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

        // Sending  paymentMethodId, selected plan's Price ID, and email to the backend
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
            alert('Subscription successful!'); 
        }

        setLoading(false);
    };

    return (
          
        <div className='pay'>
        <form onSubmit={handleSubmit}>
            <input
                type="email"onClick={PaymentTime}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />&nbsp; &nbsp; &nbsp; &nbsp;
            <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                <option value="">Select a Plan</option>
                <option value="price_1Q7ZgCFMGhaCRLSyTB2wsORQ">Free Plan(1 Internship)</option>
                <option value="price_1Q6DcyFMGhaCRLSyuMQ7769W">Bronze Plan:Rs-100/month(3 Internships)</option>
                <option value="price_1Q6DfOFMGhaCRLSyunXaAyeY">Silver Plan:Rs-300/month(5 Internships)</option>
                <option value="price_1Q6DgbFMGhaCRLSyd0BBG1aO">Gold Plan:Rs-1000/month(Unlimited Internships)</option>
            </select>
            <br/><br/>
            
            <CardElement />
            <br/>
            <button type="submit" className='bg-blue-600 text-white rounded-xl p-1 mr-0' disabled={!stripe || loading}>
                Subscribe
            </button>
            {error && <div>{error}</div>}
        </form>
        </div>
    );
};

export default SubscriptionForm;