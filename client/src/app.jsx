// App component renders all routes

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, ChirpContainer, Edit, Delete, Purchase } from './components';
// import { Elements, StripeProvider } from 'react-stripe-elements';

import './styles.css';

class App extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/purchase" component={Purchase} />
                        <Route path="/:id/edit" component={Edit} />
                        <Route path="/:id/delete" component={Delete} />
                        <Route path="/:id" component={ChirpContainer} />
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}

export default App;

// with Link wrapped with both:
// wrapping stripeprovider around router and elements around route path makes other routes blank too
// same with only elements around route path, plus error: The context `tag` is marked as required in `Elements`, but its value is `undefined`.

// with Link wrapped with stripeProvider only & elements around route path; same as line above

// with Link wrapped with elements only and stripeprovider wrapping router here; same as original problem - routes work, purchase page blank