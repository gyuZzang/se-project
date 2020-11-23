import React, { Component } from 'react';
import api from './API';

class PrevOrder extends Component{
    state={
        data:null,
        prevOrderList:null
    }
    getPrevOrderdata(){
        api.get(`/user/1/orders`) //TODO: param id 추가할 것 
        .then(response => {
            this.setState({data:response.data.data })
            console.log(this.state.data)
        })
    }
    render(){
        let prevOrderList=[]
        if(this.state.data===null){
            this.getPrevOrderdata()
        }
        else if(this.state.prevOrderList===null){
            prevOrderList=this.state.data.map((order)=>(
                <OrderElement className="order_element" order_at={order.order_at} price={order.total_price} dishes={order.order_element_list}></OrderElement>
            )) //TODO: 클릭 시 바로 Order 페이지

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

function OrderElement({order_at,price,dishes}){//Q: 스타일 추가할까?
    return(
        <li className="order_element">
            <h3>
                {order_at}
            </h3>
            <p>
                {price}
            </p>
            <p>
                {dishes}
            </p>

        </li>
    )
}
export default PrevOrder