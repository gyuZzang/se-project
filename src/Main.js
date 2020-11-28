import React, { Component } from 'react';
import MenuList from './ui/MenuList'
import StyleList from './ui/StyleList'
import {Link} from 'react-router-dom'
import api from './API';

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
                    <Link to="/myInfo" className="myInfo_button">my info</Link>
                    <Link to="/prevOrder" className="prev_order_button">prev order</Link>
                </div>
                <div className="main_body">
                    <div className="menu">
                        <h2>
                            MENU
                        </h2>
                        <MenuList onSubmit={this.setSelectedMenu} />
                    </div>                    
                    <div className="menu">
                        <h2>
                            Style
                        </h2>
                        <StyleList onSubmit={this.setSelectedStyle} />
                    </div>
 
                </div>                   
                <div className="order_button" >
                    <Link to={`/order/${this.state.selectedMenu}/${this.state.selectedStyle}`} className="order_button">order</Link>
                </div> 
            </div>
        )
    }
}

export default Main