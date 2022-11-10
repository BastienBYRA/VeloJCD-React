import React from "react";
import bicycle from '../assets/bicycle.svg';

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <header>
                <h1>Trouve un Vélo</h1>
                <img src={bicycle} alt="Image de velo" />
            </header>
        )
    }
}

export default Header;