import React, {Component} from 'react';
import { Icon } from 'antd';
import logo from '../assets/images/logo.svg';

class TopBar extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <span className="App-title"> Pet Boarding Service </span>

                {
                        <a className="sitter-login-topbar" onClick={this.props.handleSitterLogin} >
                            <Icon type="Become a Sitter"/>{' '}Become a Sitter
                        </a>
                }

                {

                        <a className="search-sitter-topbar"  >
                            <Icon type="Search a Sitter"/>{' '}Search a Sitter
                        </a>
                }

                {

                        <a className="view-request-topbar"  >
                            <Icon type="View my Requests"/>{' '}View my Requests
                        </a>
                }

                {

                        <a className="view-order-topbar"  >
                            <Icon type="View my Orders"/>{' '}View my Orders
                        </a>
                }

                {
                    this.props.isLoggedIn ?
                        <a className="logout" onClick={this.props.handleLogout} >
                            <Icon type="logout"/>{' '}Logout
                        </a> : null
                }

            </header>
        );
    }
}

export default TopBar;