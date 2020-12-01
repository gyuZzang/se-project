import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './Main'
import MyInfo from './MyInfo'
import Order from './Order'
import PrevOrder from './PrevOrder'
import Login from './Login'
import CustomerInfo from './manager/CustomerInfo'
import Main_manager from './manager/Main_manager'
import './Main.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
class App extends Component{
  state={
    isLoggedIn:false
  }
  render(){
    return (
      
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main}/>
          <Route exact path="/main_manager" component={Main_manager}/>
          <Route exact path="/customer" component={CustomerInfo}/>
	        <Route exact path="/myInfo" component={MyInfo} />
	        <Route exact path="/order/:menu/:style" component={Order} />
	        <Route exact path="/prevOrder" component={PrevOrder} />
        </Switch>
      </Router>
    );
  }
}

export default App;
