import React from "react";
import error from '../assets/error.svg';

class Error extends React.Component {
    constructor(props){
        super(props);
        this.errorInApp = this.props.errorInApp
    }

    render() {
        return (
            <div className='error-result'>
                <h1>{this.errorInApp}</h1>
                <img src={error} alt="erreur"/>
            </div>
        )
    }
}

export default Error;