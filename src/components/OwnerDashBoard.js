import React, {Component} from 'react';
import {API_ROOT, TOKEN_KEY} from "../constants";
import Sitter from "./Sitter";
import {Tabs} from "antd";

const { TabPane } = Tabs;

function ajax(method, url, data, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            successCallback(xhr.responseText);
        } else {
            errorCallback();
        }
    };

    xhr.onerror = function() {
        console.error("The request couldn't be completed.");
        errorCallback();
    };

    if (data === null) {
        xhr.send();
    } else {
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Content-Type",
            "application/json;charset=ISO-8859-1");
        xhr.send(data);
    }
}

const req = JSON.stringify({
    user_id: '1111',
});

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
        return fetch(`${API_ROOT}/viewownerorder?user_id=${1111}`, {
            method: 'GET',
        })
            .then((response) => {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('Failed to load order.');
            })
            .then((data) => {
                console.log(data);
                this.setState({orders: data ? data : []});
                this.renderOrders();
            })
            .catch((e) => {
                console.error(e);
                this.setState({error: e.message});
            });
    };

    //     ajax('GET', `${API_ROOT}/viewownerorder`, req,
    //         // successful callback
    //         function(res) {
    //             var orders = JSON.parse(res);
    //             if (!orders || orders.length === 0) {
    //                 alert('No satisfied orders');
    //             } else {
    //                 console.log(orders);
    //             }
    //         },
    //         // failed callback
    //         function() {
    //             alert('Cannot load orders.');
    //         }
    //     );
    // };

    renderOrders() {
        const { orders } = this.state;
        if (orders.length > 0) {
            const renderedOrders = orders
                .map((order) => {
                    return {
                        orderId: order.order_id,
                        sitterName: order.sitter_firstName + " " + order.sitter_lastName,
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
                            {/*{this.state.orders.map(order =>*/}
                            {/*    <Order key={order.sitterId} order={order}/>)}*/}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default OwnerDashBoard;