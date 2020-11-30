import React, { Component } from 'react';
import MenuList from '../ui/MenuList'
import StyleList from '../ui/StyleList'
import {Link} from 'react-router-dom'
import api from '../API';
import ModifyMenu from '../ui/ModifyMenu';

//https://velog.io/@devmoonsh/React-Router : 페이지 이동 라우터
class Main extends Component{
    state={
        selectedMenu:"",
        selectedStyle:"",
        dish2amount:null
    }
    
    setSelectedMenu=id=>{
        this.setState({selectedMenu:id})
    }    
    setSelectedStyle=id=>{
        this.setState({selectedStyle:id})
    }
    render(){
        return(
            <div className="main_wrapper">            
                <div className="header">
                    <h1 className="title">
                        Mr.Daebak Dinner Service
                    </h1>
                    <Link to="/myInfo" className="prev_order_button">my Info</Link>
                    <Link to="/customer" className="prev_order_button">customer</Link>
                </div>
                <div className="main_body">
                    <div className="menu">
                        <h2>
                            MENU
                        </h2>
                        <ModifyMenu onSubmit={this.setSelectedMenu} />
                    </div>                    
                    <div className="menu">
                        <h2>
                            Style
                        </h2>
                        <StyleList onSubmit={this.setSelectedStyle} />
                    </div>
 
                </div>                   

            </div>
        )
    }
}

export default Main