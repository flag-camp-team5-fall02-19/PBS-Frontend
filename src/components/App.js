import { Route, Switch, Redirect} from 'react-router-dom';

import React, {Component}from 'react';
import TopBar from './TopBar';
import BottomNavBar from './BottomNavBar';
import Main from './Main'

import { TOKEN_KEY, SITTER, OWNER } from "../constants";

import '../styles/App.css';
import SitterDashBoard from "./SitterDashBoard";

class App extends Component{

  state = {
      isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
      sitterLoginRequest: false,
      ownerLoginRequest: false,
      isSitterLoggedIn: Boolean(localStorage.getItem(SITTER)),
      isOwnerLoggedIn: Boolean(localStorage.getItem(OWNER)),
      searchSitterRequest: false,
  };

  handleLoginSucceed = (token) => {
    console.log('token --- ', token);
    localStorage.setItem(TOKEN_KEY, token);
    this.setState({ isLoggedIn: true});
    if (this.state.sitterLoginRequest) {
        localStorage.setItem(SITTER, token);
        this.setState({ sitterLoginRequest: false});
        this.setState({ isSitterLoggedIn: true});
    } else {
        localStorage.setItem(OWNER, token);
        this.setState({ ownerLoginRequest: false});
        this.setState({ isOwnerLoggedIn: true});
    }
  };

  handleLogout = () => {
    console.log("after clicked logout");
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(SITTER);
    localStorage.removeItem(OWNER);
    this.setState({ isLoggedIn: false });
    this.setState({ searchSitterRequest: false});
    this.setState({ isSitterLoggedIn: false});
    this.setState({ isOwnerLoggedIn: false});
    this.setState({ sitterLoginRequest: false});
    this.setState({ ownerLoginRequest: false});
  };

  handleSitterLogin = () => {
        console.log("after clicked become a sitter");
        this.setState({ isLoggedIn: false });
        this.setState({ searchSitterRequest: false});
        this.setState({ isSitterLoggedIn: false});
        this.setState({ isOwnerLoggedIn: false});
        this.setState({ sitterLoginRequest: true});
        this.setState({ ownerLoginRequest: false});
  };

  handleOwnerLogin = () => {
        console.log("after clicked become a owner");
        this.setState({ isLoggedIn: false });
        this.setState({ searchSitterRequest: false});
        this.setState({ isSitterLoggedIn: false});
        this.setState({ isOwnerLoggedIn: false});
        this.setState({ sitterLoginRequest: false});
        this.setState({ ownerLoginRequest: true});
  };

  handleSearchSitter = () => {
        console.log("after clicked search sitter");
        this.setState({ searchSitterRequest: true});
  };

  handleSearchSitterSucceed = () => {
        console.log("after clicked search button");
        this.setState({ searchSitterRequest: false});
  };

  render() {
    return (
        <div className="App">

          <TopBar handleSitterLogin={this.handleSitterLogin}
                  handleOwnerLogin={this.handleOwnerLogin}
                  handleSearchSitter={this.handleSearchSitter}
                  handleLogout={this.handleLogout}
                  isLoggedIn={this.state.isLoggedIn}
                  isOwnerLoggedIn={this.state.isOwnerLoggedIn}
                  //isSitterLoggedIn={this.state.isSitterLoggedIn}
          />

          <Main
              handleLoginSucceed={this.handleLoginSucceed}
              hanldeSearchSitterSucceed={this.handleLoginSucceed}
              isLoggedIn={this.state.isLoggedIn}
              isSearchRequest={this.state.searchSitterRequest}
              isOwnerLoggedIn={this.state.isOwnerLoggedIn}
              isSitterLoggedIn={this.state.isSitterLoggedIn}
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
