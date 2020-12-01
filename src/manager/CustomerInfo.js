import React, { Component } from 'react';
import api from '../API';

class CustomerInfo extends Component{
    state={
        userList=null
    }
    getCustomerInfo=()=>{
        api.get('/users',{
            page:0,
            size:10
        })
        .then(res => {
            this.setState({userList:res.data.data.user_list})
        })
    }
    render(){
        userList=[]
        if(this.state.userList===null){
            this.getCustomerInfo()
        }
        else{
            useList=this.state.userList.map((user)=>{
                <li className="component--item_card" >
                    <div className="component--item_text">
                        <h3>
                            <span >{user.email}</span>
                        </h3>
                        <p> {user.name}</p>
                        <p> {user.gender}</p>
                        <p> {user.address}</p>
                        <p> {user.phone_number}</p>
                    </div>
                </li>
            })
        }
        return(
            <div>
                <ul className="menu">
                    {userList}
                </ul>

            </div>

           
        )
    }
}