// ChirpContainer component get requests single chirp

import React, { Component } from 'react';
// import 'isomorphic-fetch';
import Chirp from './chirp';

class ChirpContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            text: "",
        }
    }

    componentDidMount() {
        fetch(`http://127.0.0.1:3000/api/chirps/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    user: data.name,
                    text: data.text
                })
            })
            .catch(err => {
                alert("Error: Chirp failed to load");
                console.log(err);
            })
    }

    render() {
        return <Chirp user={this.state.user} text={this.state.text} id={this.props.match.params.id} />
    }
}

export { ChirpContainer };