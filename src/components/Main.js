import React, {Component} from 'react';
//import { Register } from './Register';
import { Route, Switch, Redirect} from 'react-router-dom';
import { OwnerLogin } from './OwnerLogin'
import OwnerDashBoard from "./OwnerDashBoard";
import { SitterLogin } from './SitterLogin'
import SitterDashBoard from "./SitterDashBoard";
import { SearchSitter } from "./SearchSitter";
import TopBar from "./TopBar";

class Main extends Component {

    getOwnerLogin = () => {
        //console.log(this.props.isSitterLoginRequest);
        if (this.props.isSearchRequest) {
            return (
                <Redirect to="/searchsitter" />
            )
        } else if (this.props.isSitterLoginRequest) {
            return (
                    <Redirect to="/sitterlogin" />
            )
        } else if (this.props.isOwnerLoginRequest) {
            return (
                <OwnerLogin handleLoginSucceed={this.props.handleLoginSucceed}/>
            )
        } else {
            return this.props.isLoggedIn ?
                <Redirect to="/ownerdashboard" />
                :
                <OwnerLogin handleLoginSucceed={this.props.handleLoginSucceed}/>
        }

    };

    getOwnerDashBoard = () => {
        //console.log(this.props.isSitterLoginRequest);
        if (this.props.isSearchRequest) {
            return (
                <Redirect to="/searchsitter" />
            )
        } else if (this.props.isSitterLoginRequest) {
            return (
                <Redirect to="/sitterlogin" />
            )
        } else if (this.props.isOwnerLoginRequest) {
            return (
                <Redirect to="/ownerlogin" />
            )
        } else {
            return this.props.isLoggedIn ?
                <OwnerDashBoard/>
                :
                <Redirect to="/ownerlogin"/>
        }
    };

    getSitterLogin = () => {
        //console.log(this.props.isSitterLoginRequest);
        if (this.props.isSearchRequest) {
            return (
                <Redirect to="/searchsitter" />
            )
        } else if (this.props.isSitterLoginRequest) {
            return (
                <SitterLogin handleLoginSucceed={this.props.handleLoginSucceed}/>
            )
        } else if (this.props.isOwnerLoginRequest) {
            return (
                <Redirect to="/ownerlogin" />
            )
        } else {
            return this.props.isLoggedIn ?
                <Redirect to="/sitterdashboard" />
                :
                <SitterLogin handleLoginSucceed={this.props.handleLoginSucceed}/>
        }
    };

    getSitterDashBoard = () => {
        //console.log(this.props.isSitterLoginRequest);
        if (this.props.isSearchRequest) {
            return (
                <Redirect to="/searchsitter" />
            )
        } else if (this.props.isSitterLoginRequest) {
            return (
                <Redirect to="/sitterlogin"/>
            )
        } else if (this.props.isOwnerLoginRequest) {
            return (
                <Redirect to="/ownerlogin" />
            )
        } else {
            return this.props.isLoggedIn ?
                <SitterDashBoard/>
                :
                <Redirect to="/sitterlogin"/>
        }
    };

    getSearchSitter = () => {
        if (this.props.isSearchRequest) {
            return (
                <SearchSitter handleSearchSitterSucceed={this.props.handleSearchSitterSucceed}/>
            )
        } else if (this.props.isSitterLoginRequest) {
            return (
                <Redirect to="/sitterlogin"/>
            )
        } else if (this.props.isOwnerLoginRequest) {
            return (
                <Redirect to="/ownerlogin" />
            )
        } else {
            if (this.props.isLoggedIn) {
                if (this.props.isOwnerLoggedIn) {
                    return <OwnerDashBoard/>
                } else if (this.props.isSitterLoggedIn) {
                    return <SitterDashBoard/>
                }
            } else {
                return <Redirect to="/ownerlogin" />
            }
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
                    <Route path="/searchsitter" render={this.getSearchSitter} />
                    <Route render={ this.getOwnerLogin}/>

                </Switch>
            </div>
        );
    }
}

export default Main;