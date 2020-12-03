import React, { Component } from 'react';
import MenuList from './ui/MenuList'
import StyleList from './ui/StyleList'
import {Link} from 'react-router-dom'
import MainMenu from './MainMenu.js'
import api from './API';
//해야할 것
//1. 매니저 화면 : 메뉴 및 스타일  수정, 추가: 
//3. 스태프 화면: 다음 할 일 get, + 할일 정보 띄우는 화면
//4. 승인화면: 승인 주문 가져오기 + 승인요청 보내기


//https://velog.io/@devmoonsh/React-Router : 페이지 이동 라우터
class Main extends Component{
    state={
        selectedMenu:null,
        selectedStyle: null,
        dish2amount:null
    }
    
    setSelectedMenu=menu=>{
        this.setState({selectedMenu:menu})
    }    
    setSelectedStyle=style=>{
        this.setState({selectedStyle:style})
    }
    getSelectedDishes=(menu)=>{
        const dish_list = menu.menu_element_list.map(menu_element => {
            return {
                'dish_id' : menu_element.dish_id,
                'quantity' : menu_element.quantity
            }
        })
        return dish_list
    }
    render(){
        const orderLink = (this.state.selectedMenu==null || this.state.selectedStyle==null) ? 
            '주문' :
            <Link to={{
                pathname: '/order',
                data : [{
                    dishes: this.getSelectedDishes(this.state.selectedMenu),
                    style : this.state.selectedStyle
                }]
            }} className="order_button">주문</Link> 
        return(
            <div className="main_wrapper">            
                <div className="header">
                    <h1 className="title">
                        Mr.Daebak Dinner Service
                    </h1>
                    <MainMenu/>
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
                    {orderLink}
                </div> 
            </div>
        )
    }
}

export default Main