import React from 'react';
import InventoryContainer from './InventoryContainer/InventoryContainer.js';
import logo from './printsbyfrank-inventory-manager.jpg';
import LoginModal from './LoginModal/LoginModal';
import axios from 'axios';

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      loggedIn: false,
      isFrank: false
    }
    this.changeLoginStatus = this.changeLoginStatus.bind(this)
  }

  changeLoginStatus(loggedIn, isFrank){
    this.setState({
      loggedIn: true,
      isFrank
    })
  }

  render(){
    return (
      <div className="main-container">
        <img src={logo} alt="prints by frank inventory manager" className="logo" />
        { this.state.loggedIn ? 
          <InventoryContainer 
            isFrank={this.state.isFrank}
          />
          :
          <LoginModal 
            changeLoginStatus={ this.changeLoginStatus }
          />
        }
        <footer>
          Copyright Prints By Frank 2019
        </footer>
    </div>
  );
}
}