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
import Main_staff from './staff/Main_staff'
import Confirm from './Confirm'
import NextCook from './staff/NextCook'
import NextDeliver from './staff/NextDeliver'
import './Main.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
class App extends Component{
  
  render(){
    return (
      
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/main" component={Main}/>
          <Route exact path="/main_manager" component={Main_manager}/>
          <Route exact path="/main_staff" component={Main_staff}/>
          <Route exact path="/next_cook" component={NextCook}/>
          <Route exact path="/next_delivery" component={NextDeliver}/>
          <Route exact path="/customer" component={CustomerInfo}/>
	        <Route exact path="/myInfo" component={MyInfo} />
	        <Route exact path="/order" component={Order} />
	        <Route exact path="/prevOrder" component={PrevOrder} />
          <Route exact path="/admin/confirm" component={Confirm} />
        </Switch>
      </Router>
    );
  }
}

export default App;
