// Purchase component renders Stripes' payment elements 

import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement, } from 'react-stripe-elements';
import React, { Component } from 'react';
import logowhite from './logowhite.png'

class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = { complete: false }
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {
        ev.preventDefault();
        let { token } = await this.props.stripe.createToken();
        console.log(token)
        let response = await fetch("/charge", {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: token.id
        });
        if (response.ok) {
            console.log("Purchase Complete")
            this.setState({ complete: true })
        } else {
            console.log("Purchase Error")
            console.log(response)
        }
    }

    render() {
        if (this.state.complete) return <h2 className="blue flex center">Purchase Complete</h2>;

        return (
            <div>
                <div className="flex center column">
                    <h2 className='blue'>Purchase Followers</h2>
                    <div className='flex center row'>
                        <img src={logowhite} alt="logo" height="40px" />
                        <p className='white bold cost'>Buy 1,000 followers for $14</p>
                        <img src={logowhite} alt="logo" height="40px" />
                    </div>
                </div>
                <div className="flex center white">
                    <form className="flex column" onSubmit={this.submit}>
                        <label>
                            <span className="block">Name on Card</span>
                            <input
                                className="purchaseinput"
                                type="text"
                                placeholder="Name on Card"
                            />
                        </label>
                        <label>
                            <span>Card number</span>
                            <CardNumberElement />
                        </label>
                        <label>
                            <span>Expiration date</span>
                            <CardExpiryElement />
                        </label>
                        <label>
                            <span>CVC</span>
                            <CardCVCElement />
                        </label>
                        <label>
                            <span>Postal code</span>
                            <PostalCodeElement />
                        </label>
                        <div>
                            <button type="submit" className="bold blue">Purchase</button></div>
                    </form>
                </div>
            </div>
        );
    }
}

export default injectStripe(Purchase);