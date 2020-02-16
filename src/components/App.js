import { Route, Switch, Redirect} from 'react-router-dom';

import React, {Component}from 'react';
import TopBar from './TopBar';
import BottomNavBar from './BottomNavBar';
import Main from './Main'

import { TOKEN_KEY } from "../constants";

import '../styles/App.css';
import SitterDashBoard from "./SitterDashBoard";

class App extends Component{

  state = {
      isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
      sitterLoginRequest: false,
      ownerLoginRequest: false,
  };

  handleLoginSucceed = (token) => {
    console.log('token --- ', token);
    localStorage.setItem(TOKEN_KEY, token);
    this.setState({ isLoggedIn: true});
    this.setState({ sitterLoginRequest: false});
    this.setState({ ownerLoginRequest: false});
  };

  handleLogout = () => {
    console.log("after clicked logout");
    localStorage.removeItem(TOKEN_KEY);
    this.setState({ isLoggedIn: false });
    this.setState({ sitterLoginRequest: false});
    this.setState({ ownerLoginRequest: false});
  };

  handleSitterLogin = () => {
        console.log("after clicked become a sitter");
        this.setState({ isLoggedIn: false });
        this.setState({ sitterLoginRequest: true});
        this.setState({ ownerLoginRequest: false});
  };

  handleOwnerLogin = () => {
        console.log("after clicked become a owner");
        this.setState({ isLoggedIn: false });
        this.setState({ ownerLoginRequest: true});
        this.setState({ sitterLoginRequest: false});
  };

  render() {
    return (
        <div className="App">

          <TopBar handleSitterLogin={this.handleSitterLogin}
                  handleOwnerLogin={this.handleOwnerLogin}
                  handleLogout={this.handleLogout}
                  isLoggedIn={this.state.isLoggedIn}
          />

          <Main
              handleLoginSucceed={this.handleLoginSucceed}
              isLoggedIn={this.state.isLoggedIn}
              isSitterLoginRequest={this.state.sitterLoginRequest}
              isOwnerLoginRequest={this.state.ownerLoginRequest}
          />

          <BottomNavBar
          />

        </div>
    )
  };
}

export default App;
