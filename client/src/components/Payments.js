import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render(){
        
        return (
            <StripeCheckout
                name="Titel"
                description="This is the description"
            // defaults to use USD , else has to specifc for now its USD $ amount in cents
                amount={500}
                // not a token but a callback function --> will be resulting in a token we get back
                token={token => console.log(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">ADD CREDITS </button>
            </StripeCheckout>
        )
    }
}
export default Payments;