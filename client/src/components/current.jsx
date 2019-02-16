// Current component displays current chirps and details button/route

import React, { Fragment } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const Current = (props) => {
    let chirpDisplay = [];
    (props.chirps).forEach(item => {
        chirpDisplay.push(
        <div className='chirps white flex center' key={item.id}>
        <p>{item.name}: {item.text}</p>
        <Fragment >
            <Link to={`/${item.id}`}>
            <button className="details blue bold">Details</button>
            </Link>
        </Fragment>
        </div>
        )
    })

    return (
        <div className="flex center">
            <div className="column">
                <h2 className="blue flex center current">Current Chirps</h2>
                <div className="display">{chirpDisplay}</div>
            </div>
        </div>
    )
}

export default Current;