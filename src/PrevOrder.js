import React, { Component } from 'react';
import api from './API';
import {Link} from 'react-router-dom'

class PrevOrder extends Component{
    state={
        selectedOrder: null,
        data: new Array(),
        prevOrderList:new Array(),
        selectedDishes:new Array(),
        style:null
    }
    getPrevOrderdata(){
        api.get('/user/orders')
        .then(response => {
            this.setState({ data: response.data.data })
        })
    }
    setSelect = (dishes,style) => {
        this.setState({selectedDishes:dishes, style: style})
    }
    order_delete_handler=(id)=>{
        api.put(`/user/order/${id}/cancel`)
        .then(res =>
            {
                console.log(res)
                if(res.data.description=="OK"){
                    alert('주문 취소 완료')
                }
                else{
                    alert('주문 취소 실패')
                }
                this.getPrevOrderdata()
            })
    }
    render(){
        let prevOrderList=[]
        if(this.state.data.length == 0){
            this.getPrevOrderdata()
        }
        else if(this.state.prevOrderList.length == 0){
            let del
            prevOrderList = this.state.data.map((order)=>{
                const order_elements = order.order_element_list
                const order_element_tag_list = order_elements.map(order_element => <OrderElement className="order_element" dish={order_element.dish_name} quantity={order_element.quantity}></OrderElement>)
                if(order.status=="PENDINGFONFIRM"){
                    del=<div onClick={()=>this.order_delete_handler(order.id)}><button>x</button></div>
                }
                else {
                    del=""
                }

                let order_group = <OrderGroup className="col order_group" order_at={order.order_at} price={order.total_price} order_elements={order_element_tag_list}  dishes={order_elements} style={order.style} setSelect={this.setSelect} del={del}></OrderGroup>

                return order_group
            }) //TODO: 클릭 시 바로 Order 페이지 dish_element, style 정보 넘기기
            this.state.prevOrderList=prevOrderList
        }
        console.log(this.state.selectedDishes,this.state.style)
        return(
            <div className="main_wrapper">            
                <Link  to="/main" className="header">
                    <h1 className="title">
                        Mr.Daebak Dinner Service
                    </h1>
                </Link>
                <div className="col-sm-3"></div>

                <div className="col-sm-9">
                    <h2>
                        Previous Order List
                    </h2>
                    <ul className="wrap_menu_list">
                        {this.state.prevOrderList}
                    </ul>
                    
                </div>
                <Link to={{
                    pathname: "/order",
                    data: [{
                        style : this.state.style,
                        dishes : this.state.selectedDishes
                    }]
                }}><div className="order_button">order</div></Link>
                
            </div>    
        )
        
    }
}

function OrderGroup({order_at,price,order_elements, setSelect, dishes, style,del}){
    const oa = new Date(order_at)
    console.log(oa);
    const order_at_string = `${oa.getFullYear()}년 ${oa.getMonth()+1}월 ${oa.getDate()}일  ${oa.getHours()}시 ${oa.getMinutes()}분`
    return(
        <div>
            <li className='col-sm-12 order_element component--item_card' onClick={()=>setSelect(dishes,style)}>
                <div className="col-sm-12">
                <h3 className="row-sm-12">
                    {order_at_string}
                </h3>
                <p className="row"> 
                    가격: {price}원
                </p>
                <p className="row">
                    {order_elements}
                </p></div>
            </li>
            {del}
        </div>
    )
}

function OrderElement({dish, quantity}){//Q: 스타일 추가할까? //A: 제목만
    return(
        <li className="row order_element">
            <p className="col-sm-10">
                {dish} :{quantity}
            </p>
        </li>
    )
}

export default PrevOrder