import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import SubscriptionForm from './SubscriptionForm'

const stripePromise=loadStripe('pk_test_51Q53EfFMGhaCRLSyxu0TfEjRjVWzHrYtqCfRryFb2m6QHDqAPA3seLGUq3bGbIYTZUxJluchzzDQNlJFCvdTmc0g00H2rICfih');

const SubscriptionWrapper=()=>{
    return(
        <Elements stripe={stripePromise}>
            <SubscriptionForm/>
        </Elements>
    );
}

export default SubscriptionWrapper;