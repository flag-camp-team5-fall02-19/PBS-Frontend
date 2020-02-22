import React, {Component} from 'react';
import {API_ROOT, TOKEN_KEY, USERID} from "../constants";
import Order from "./Order";
import Request from "./Request";
import {Tabs} from "antd";
import Calendar from "./Calendar";

const { TabPane } = Tabs;

class SitterDashBoard extends Component {
    state = {
        error: '',
        orders: [],
        myRenderedOrders: [],
        requests: [],
        myRenderedRequests: [],
    };

    componentWillMount() {
        this.loadSitterOrders();
        this.loadSitterRequests();
    }

    loadSitterOrders = () => {
        const token = localStorage.getItem(TOKEN_KEY);
        this.setState({error: ''});
        return fetch(`${API_ROOT}/viewsitterorder`, {
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
                        name: order.owner_firstName + " " + order.owner_lastName,
                        orderStatus: order.order_status,
                    };
                });
            this.setState({ myRenderedOrders: renderedOrders});
            console.log(this.state.myRenderedOrders);
        } else {
            return 'No satisfied order';
        }
    }

    loadSitterRequests = () => {
        const token = localStorage.getItem(TOKEN_KEY);
        this.setState({error: ''});
        return fetch(`${API_ROOT}/viewowner`, {
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
                this.setState({requests: data ? JSON.parse(data) : []});
                this.renderRequests();
            })
            .catch((e) => {
                console.error(e);
                this.setState({error: e.message});
            });
    };

    renderRequests() {
        const { requests } = this.state;
        if (requests.length > 0) {
            const renderedRequests = requests
                .map((request) => {
                    return {
                        requestId: request.requests[0].request_id,
                        name: request.first_name + " " + request.last_name,
                        message: request.requests[0].message,
                        time: request.requests[0].time,
                    };
                });
            this.setState({ myRenderedRequests: renderedRequests});
            console.log(this.state.myRenderedRequests);
        } else {
            return 'No satisfied request';
        }
    }

    render() {
        return (
            <div>
                <div>
                    <img className="sitter-dashboard-logo" src="https://ded7t1cra1lh5.cloudfront.net/note_attachments/76500/082113567e9fd785719b1c1a655682f4db6f8e65/original/IMG_1387.PNG?1418325282"
                    />
                </div>
                <div>
                    <Tabs className="main-tabs">
                        <TabPane tab="My Orders" key="1">
                            {this.state.myRenderedOrders.map(order =>
                                <Order key={order.orderId} order={order}/>)}
                        </TabPane>
                        <TabPane tab="My Requests" key="2">
                            {this.state.myRenderedRequests.map(request =>
                                <Request key={request.requestId} request={request}/>)}
                        </TabPane>
                    </Tabs>
                    <br/>
                    <Calendar/>
                    <br/>
                </div>
            </div>
        );
    }
}

export default SitterDashBoard;