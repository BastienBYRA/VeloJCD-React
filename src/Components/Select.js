import React from "react";

class Select extends React.Component {
    constructor(props){
        super(props);
        this.chooseCity = this.props.chooseCity;
        this.frenchCity = this.props.frenchCity;
        this.updateSelect = this.props.updateSelect;
    }

    render() {
        return (
            <>
                <select id="chooseCity"
                    value={this.chooseCity}
                    onChange={(e) => {
                        console.log(e.target.options[e.target.selectedIndex].text)
                        this.updateSelect(e.target.value, e.target.options[e.target.selectedIndex].text) 
                        
                    }}
                >
                {this.frenchCity.map((city, i) => (
                    <option key={i} value={city[1]}>{city[0]}</option>
                ))}
                </select>
            </>
        )
    }
}

export default Select;