// ChirpContainer component get requests single chirp

import React, { Component } from 'react';
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
        fetch(`/api/chirps/${this.props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                // different destructuring for postgres
                let results = data.results[0]
                this.setState({
                    // user: data.results.name,
                    // text: data.results.text
                    user: results.name,
                    text: results.text
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