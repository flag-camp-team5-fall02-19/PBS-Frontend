import React, {Component} from 'react';

class Request extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="request">
                <li className="list">
                    <ul> {`Name: ${this.props.request.name}`} </ul>
                    <ul> {`Message: ${this.props.request.message}`} </ul>
                    <ul> {`Time: ${this.props.request.time}`} </ul>
                </li>
            </div>
        );
    }
}

export default Request;