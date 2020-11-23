import React, { Component } from 'react';
import MenuList from './ui/MenuList'
import {Link} from 'react-router-dom'

//https://velog.io/@devmoonsh/React-Router : 페이지 이동 라우터
class Main extends Component{
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
                        <MenuList/>
                    </div>
                    <div className="menu">
                        <h2>
                            STYLE
                        </h2>
                        <MenuList/>
                    </div>
                </div>                   
                <div className="order_button">
                    <Link to="/order" className="order_button" >order</Link>
                </div> 
            </div>


        )
    }
}

export default Main