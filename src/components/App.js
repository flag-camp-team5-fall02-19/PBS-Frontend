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
  };

  handleLoginSucceed = (token) => {
    console.log('token --- ', token);
    localStorage.setItem(TOKEN_KEY, token);
    this.setState({isLoggedIn: true});
  };

  handleLogout = () => {
    console.log("after clicked logout");
    localStorage.removeItem(TOKEN_KEY);
    this.setState({ isLoggedIn: false });
    this.setState({ sitterLoginRequest: false});
  };

  handleSitterLogin = () => {
      console.log("after clicked become a sitter");
      this.setState({ isLoggedIn: false });
      this.setState({ sitterLoginRequest: true});
  };

  render() {
    return (
        <div className="App">

          <TopBar handleSitterLogin={this.handleSitterLogin}
                  handleLogout={this.handleLogout}
                  isLoggedIn={this.state.isLoggedIn}
          />

          <Main
              handleLoginSucceed={this.handleLoginSucceed}
              isLoggedIn={this.state.isLoggedIn}
              isSitterLoginRequest={this.state.sitterLoginRequest}
          />

          <BottomNavBar
          />

        </div>
    )
  };
}

export default App;
