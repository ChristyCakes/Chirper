// NewChirp component displays input boxes & submit button and submits post request on click

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NewChirp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            text: ""
        }
        this.postChirp = this.postChirp.bind(this)
        this.inputHandler = this.inputHandler.bind(this)
    }

    inputHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    postChirp(event) {
        event.preventDefault();
        fetch('/api/chirps/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: this.state.user,
                text: this.state.text,
            })
        })
            .then(() => location.reload())
            .then(() => {
                return this.props.history.push('/');
            })
            .catch(err => {
                console.log(err)
                alert("Error: Your chirp was not created")
            })
    }

    render() {
        return (
            <div>
                <div className="flex center">
                    <form action="">
                        <input
                            type="text"
                            placeholder="UserName"
                            size="10"
                            id="user"
                            name="user"
                            className="newchirp"
                            onChange={this.inputHandler}
                            defaultValue={this.state.user}
                        />
                        <input
                            type="text"
                            placeholder="Type a new chirp"
                            size="60"
                            id="text"
                            name="text"
                            className="newchirp"
                            onChange={this.inputHandler}
                            defaultValue={this.state.text}
                        />
                        <button
                            className='blue bold'
                            onClick={this.postChirp}
                            id="submit">
                            Submit
                    </button>
                    </form>
                </div>
            </div >
        )
    }
}
export default withRouter(NewChirp);