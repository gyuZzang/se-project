import React, { Component } from 'react';
import MenuList from './ui/MenuList'
import {Link} from 'react-router-dom'
import api from './API';

//https://velog.io/@devmoonsh/React-Router : 페이지 이동 라우터
class Main extends Component{
    state={
        selectedMenu:"",
        selectedStyle:"",
        dish2amount:null
    }
    setDish2Amount=(e)=>{
        console.log('selected:'+this.state.selectedMenu)
        api.get(`/menu/${e}`)
        .then(response => {
            this.setState({dish2amount:response.data.data.menu_element_list}) 
            console.log(response)
        }).then(console.log('d2a:'+this.state.dish2amount))
    }
    setSelectedMenu=id=>{
        this.setState({selectedMenu:id})
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
                        <MenuList onSubmit={this.setSelectedMenu} setDish2amount={this.setDish2Amount} />
                    </div>
 
                </div>                   
                <div className="order_button" >
                    <Link to={`/order/${this.state.dish2amount}/${this.state.selectedStyle}`} className="order_button">order</Link>
                </div> 
            </div>
        )
    }
}

export default Main