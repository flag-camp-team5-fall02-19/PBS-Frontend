import React, {Component} from 'react';

class Sitter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="sitter">
                <li>
                    <img className="sitter-thumbnail" src={this.props.sitter.thumbnail} />
                    <ul> {`Name: ${this.props.sitter.sitterName}`} </ul>
                    <ul> {`Email: ${this.props.sitter.sitterEmail}`} </ul>
                    <ul> {`Tel: ${this.props.sitter.sitterTel}`} </ul>
                    <ul> {`Address: ${this.props.sitter.sitterAddress}`} </ul>
                    <ul> {`Zipcode: ${this.props.sitter.sitterZipcode}`} </ul>
                    <ul> {`Score: ${this.props.sitter.sitterReviewScore}`} </ul>
                    <ul> {`Price: ${this.props.sitter.sitterPrice}`} </ul>
                </li>
            </div>
        );
    }
}

export default Sitter;