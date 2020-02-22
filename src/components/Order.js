import React, {Component} from 'react';

class Order extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);
        return (
            <div className="order">
                <li className="list">
                    <ul> {`Name: ${this.props.order.name}`} </ul>
                    <ul> {`Order Status: ${this.props.order.orderStatus}`} </ul>
                </li>
            </div>
        );
    }
}

export default Order;