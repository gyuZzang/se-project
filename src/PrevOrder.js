import React, { Component } from 'react';
import api from './API';

class PrevOrder extends Component{
    state={
        data: new Array(),
        prevOrderList:new Array()
    }
    getPrevOrderdata(){
        api.get('/user/orders')
        //.then(res => res.json()) //TODO: param id,page 추가할 것          <---- ?
        .then(response => {
            console.log(response.data.data);
            this.setState({ data: response.data.data })
        })
    }
    render(){
        let prevOrderList=[]
        if(this.state.data.length == 0){
            this.getPrevOrderdata()
        }
        else if(this.state.prevOrderList.length == 0){
            prevOrderList = this.state.data.map((order)=>{
                const order_elements = order.order_element_list
                const order_element_tag_list = order_elements.map(order_element => <OrderElement className="order_element" dish={order_element.dish_name} quantity={order_element.quantity}></OrderElement>)
                
                const order_group = <OrderGroup className="order_group" order_at={order.order_at} price={order.total_price} order_elements={order_element_tag_list}></OrderGroup>

                return order_group
            }) //TODO: 클릭 시 바로 Order 페이지 dish_element, style 정보 넘기기
            this.state.prevOrderList=prevOrderList
        }
        return(
            <div>
                <h1>
                    Previous Order List
                </h1>
                <ul>
                    {this.state.prevOrderList}
                </ul>
            </div>
        )
        
    }
}

function OrderGroup({order_at,price,order_elements}){
    return(
        <li className="order_element">
            <h3>
                {order_at}
            </h3>
            <p>
                {price}
            </p>
            <p>
                {order_elements}
            </p>
        </li>
    )
}

function OrderElement({dish, quantity}){//Q: 스타일 추가할까? //A: 제목만
    return(
        <li className="order_element">
            <p>
                {dish}
            </p>
            <p>
                {quantity}
            </p>
        </li>
    )
}
export default PrevOrder