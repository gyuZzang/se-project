import React, { Component } from 'react';
import api from '../API';
import {Link} from 'react-router-dom'

class CustomerInfo extends Component{
    state={
        userList:new Array(),
        data:new Array()
    }
    getCustomerInfo=()=>{
        api.get('/users',{
            page:1,
            size:10
        })
        .then(res => {
            console.log(res.data.data)
            this.setState({data:res.data.data})
        })
    }
    render(){
        let userList=[]
        console.log(this.state.data)
        if(this.state.data.length===0){
            this.getCustomerInfo()
            console.log('불러오기')
        }
        else if (this.state.userList.length===0){
            userList=this.state.data.map((user)=>(
                <li className="component--item_card" >
                    <div className="component--item_text">
                        <h3>
                            <span>{user.email}</span>
                        </h3>
                        <p> {user.name}</p>
                        <p> {user.gender}</p>
                        <p> {user.address}</p>
                        <p> {user.phone_number}</p>
                    </div>
                </li>
            ))
            this.state.userList=userList
        }
        return(
            <div className="main_wrapper">            
                <Link to="/main_manager" className="header">
                    <h1 className="title">
                    Mr.Daebak Dinner Service</h1>
                </Link>
                <div className="main_body">
                    <ul className="menu">
                    <h2>Customer Information</h2>

                        {this.state.userList}
                    </ul>
                </div>

            </div>

           
        )
    }
}

export default CustomerInfo