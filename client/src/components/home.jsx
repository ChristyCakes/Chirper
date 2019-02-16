// Home component displays logo, Stripe purchase link, get requests all chirps

// import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import React, { Component } from 'react';
import NewChirp from './newChirp';
import Current from './current';
import logo from './logo.png';
import Purchase from './purchase'

class Home extends Component {
    constructor() {
        super();
        this.state = { chirps: [] }
    }

    componentDidMount() {
        fetch('http://127.0.0.1:3000/api/chirps')
            .then(response => response.json())    
            // .then(response => response.text())
            // .then(response => console.lot(response))
            .then(data => this.setState({ chirps: data }))
            .catch(err => {
                alert("Error: Chirps failed to load");
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <div className="flex center">
                    <img src={logo} alt="logo" height="300px" />
                    <h1 className='white'>Chirper</h1>
                </div>
                <NewChirp />
                <Current chirps={this.state.chirps} />
                <hr />
                <StripeProvider apiKey="pk_test_lKyP93clx4TYCo2CTdLxtMY3">
                    <Elements>
                        {/* <Link to='/purchase' className='panel flex center' style={{ textDecoration: 'none' }}><button className='bold grey'>Purchase Followers</button></Link> */}
                        <Purchase />
                    </Elements>
                </StripeProvider>
            </div>
        );
    }
}

export { Home };