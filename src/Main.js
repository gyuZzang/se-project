import React, { Component } from 'react';
import MenuList from './ui/MenuList'
import StyleList from './ui/StyleList'
import {Link} from 'react-router-dom'
import api from './API';
//해야할 것
//1. 매니저 화면 : 메뉴 및 스타일 리스트 get, 수정, 추가
//2. 고객 정보 불러오기: 
//3. 스태프 화면: 다음 할 일 get, + 할일 정보 띄우는 화면
//4. 승인화면: 승인 주문 가져오기 + 승인요청 보내기


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