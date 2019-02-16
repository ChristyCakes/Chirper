// Edit component displays inputs for editing single chirp, sends PUT request onClick, reroutes to home

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
// import 'isomorphic-fetch';

class Edit extends Component {
    constructor() {
        super();
        this.state = { text: "" }
        this.editChirp = this.editChirp.bind(this);
        this.inputHandler = this.inputHandler.bind(this)
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    editChirp(event) {
        event.preventDefault();
        fetch(`http://127.0.0.1:3000/api/chirps/${this.props.match.params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: this.state.text })
        })
            .then(() => this.props.history.push('/'))
            .catch(err => {
                alert("Error: Chirp not updated");
                console.log(err);
            })
    }

    render() {
        const user = this.props.location.state.user;
        const text = this.props.location.state.text;
        return (
            <div>
                <Link to="/" className="bold blue flex center" style={{ textDecoration: "none" }}>Home</Link>
                <h2 className='blue'>Edit Your Chirp</h2>
                <div className="input flex center">
                    <p className='name white'>{user}:</p>
                    <form>
                        <input
                            type="text"
                            placeholder={text}
                            size="60"
                            id="text"
                            name="text"
                            onChange={this.inputHandler}
                            value={this.state.text}
                        />
                        <button
                            style={{ fontWeight: 'bold' }}
                            className='blue'
                            onClick={this.editChirp}
                            id="submit">
                            Update
                    </button>
                    </form>
                </div>
            </div>
        )
    }
}

export { Edit };