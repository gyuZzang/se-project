import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import api from '../API'

//api res 찍어볼 것
class Main_staff extends Component{
    state={
        type:null,
    }
    getMyType= async ()=>{
        const response = await api.get(`/user`)
        console.log(response.data.data)
        this.setState({type : response.data.data.type})
    }

    render(){
        let button;
        if(this.state.type===null){
            this.getMyType()
        } 
        else {
            button = (this.state.type == "COOK") ? 
            <Link to='/next_cook' className="menu">
                next order to cook
            </Link>
            : <Link  to='/next_delivery' className="menu">
                next order to deliver
            </Link>
        }
        

        return(
            <div className="main_wrapper">            
                <Link to="/main_staff" className="header">
                    <h1 className="title">
                    Mr.Daebak Dinner Service</h1>
                </Link>
                <div className="main_body">
                    {button}
                </div>

            </div>
        )
    }



}

export default Main_staff
