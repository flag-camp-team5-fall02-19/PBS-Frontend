import React, {Component} from 'react';
import {API_ROOT, TOKEN_KEY, USERID} from "../constants";
import Order from "./Order";
import {Tabs} from "antd";

const { TabPane } = Tabs;

class OwnerDashBoard extends Component {
    state = {
        error: '',
        orders: [],
        myRenderedOrders: [],
    };

    componentWillMount() {
        this.loadOwnerOrders();
        console.log(this.state.myRenderedOrders);
    }

    loadOwnerOrders = () => {
        const token = localStorage.getItem(TOKEN_KEY);
        this.setState({error: ''});
        return fetch(`${API_ROOT}/viewownerorder`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: localStorage.getItem(USERID),
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Failed to load order.');
            })
            .then((data) => {
                console.log(data);
                this.setState({orders: data ? JSON.parse(data) : []});
                this.renderOrders();
            })
            .catch((e) => {
                console.error(e);
                this.setState({error: e.message});
            });
    };

    renderOrders() {
        const { orders } = this.state;
        if (orders.length > 0) {
            const renderedOrders = orders
                .map((order) => {
                    return {
                        orderId: order.order_id,
                        Name: order.sitter_firstName + " " + order.sitter_lastName,
                        orderStatus: order.order_status,
                    };
                });
            this.setState({ myRenderedOrders: renderedOrders});
            console.log(this.state.myRenderedOrders);
        } else {
            return 'No satisfied order';
        }
    }

    render() {
        return (
            <div>
                <div>
                    <img src="https://bayareapetpals.com/wp-content/uploads/dog-boarding-header1.jpg" />
                </div>
                <div>
                    <Tabs className="main-tabs">
                        <TabPane tab="My Orders" key="1">
                            {this.state.myRenderedOrders.map(order =>
                                <Order key={order.orderId} order={order}/>)}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default OwnerDashBoard;