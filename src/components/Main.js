import React, {Component} from 'react';
//import { Register } from './Register';
import { Route, Switch, Redirect} from 'react-router-dom';
import { OwnerLogin } from './OwnerLogin'
import OwnerDashBoard from "./OwnerDashBoard";
import { SitterLogin } from './SitterLogin'
import SitterDashBoard from "./SitterDashBoard";
import TopBar from "./TopBar";

class Main extends Component {

    getOwnerLogin = () => {
        console.log(this.props.isSitterLoginRequest);
        if (this.props.isSitterLoginRequest) {
            return (
                <Redirect to="/sitterlogin"/>
            )
        } else {
            return this.props.isLoggedIn ?
                <Redirect to="/ownerdashboard" />
                :
                <OwnerLogin handleLoginSucceed={this.props.handleLoginSucceed}/>
        }

    };

    getOwnerDashBoard = () => {
        console.log(this.props.isSitterLoginRequest);
        if (this.props.isSitterLoginRequest) {
            return (
                <Redirect to="/sitterlogin"/>
            )
        } else {
            return this.props.isLoggedIn ?
                <OwnerDashBoard/>
                :
                <Redirect to="/ownerlogin"/>
        }
    };

    getSitterLogin = () => {
        console.log(this.props.isSitterLoginRequest);
        if (this.props.isSitterLoginRequest) {
            return (
                <Redirect to="/sitterlogin"/>
            )
        } else {
            return this.props.isLoggedIn ?
                <Redirect to="/sitterdashboard" />
                :
                <SitterLogin handleLoginSucceed={this.props.handleLoginSucceed}/>
        }
    };

    getSitterDashBoard = () => {
        console.log(this.props.isSitterLoginRequest);
        if (this.props.isSitterLoginRequest) {
            return (
                <Redirect to="/sitterlogin"/>
            )
        } else {
            return this.props.isLoggedIn ?
                <SitterDashBoard/>
                :
                <Redirect to="/sitterlogin"/>
        }
    };

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route path="/register" />
                    <Route path="/ownerlogin" render={this.getOwnerLogin }/>
                    <Route path="/ownerdashboard" render={this.getOwnerDashBoard }/>
                    <Route path="/sitterlogin" render={this.getSitterLogin }/>
                    <Route path="/sitterdashboard" render={this.getSitterDashBoard }/>

                    <Route render={ this.getOwnerLogin}/>
                </Switch>
            </div>
        );
    }
}

export default Main;