import React, { Component } from 'react';
import api from './API';
import {Link} from 'react-router-dom'

class Confirm extends Component{

    state = {
        isloaded : false,
        order_group_components : null,
        order_groups : null
    }

    setSelect = (id) => {
        const className = "component--item_card_selected"
        const selectedOrder = document.querySelector('.'+ id)
        if(selectedOrder.classList.contains(className)) {
            selectedOrder.classList.remove(className)
        } else {
            selectedOrder.classList.add(className)
        }
    }

    setConfirmOrderList = async () => {
        const {data: {data}} = await api.get("/order/confirm");
        const order_groups = data;
        const order_group_components = data.map((order, idx) => {
            return this.toOrderGroupComponent(order, idx);
        })
        const isloaded = true
        this.setState({order_group_components, isloaded, order_groups})
    }

    toOrderGroupComponent = (order, idx) => {
        const order_elements = order.order_element_list
        const order_element_tag_list = order_elements.map((order_element) => <OrderElement className="order_element" dish={order_element.dish_name} quantity={order_element.quantity}></OrderElement>)
        
        const order_group_component = <OrderGroup classname={`pending_confirm_order_${idx}`} className="order_group" order_at={order.order_at} price={order.total_price} order_elements={order_element_tag_list}  dishes={order_elements}style={order.style} setSelect={this.setSelect}></OrderGroup>

        return order_group_component
    }

    confirmOrder = async () => {
        const size = this.state.order_group_components.length;
        const selected_orders = [];
        const className = "component--item_card_selected"

        for(let i=0; i<size; i++) {
            const order = document.querySelector(`.pending_confirm_order_${i}`)
            if(order.classList.contains(className)) {  
                const selected_order_id = this.state.order_groups[i].id;
                selected_orders.push(selected_order_id);
            }
        }
        const order_id_list = selected_orders.map(order_id => {
            return {
                'id' : order_id
            }
        })
        const request_body = {
            description: "OK",
            data: order_id_list
        }  
        console.log(request_body)
        const res = await api.post('/order/confirm', request_body)
    
        console.log(res);
        if(res.data.description==="OK"){
            alert("승인 완료!")
            this.setState({order_group_components : [], isloaded : false});
        }
    }
    render() {
        const order_component_list = this.state.order_group_components != null && this.state.order_group_components.length != 0 ? this.state.order_group_components : <span>승인할 주문 없음</span>
        const load_confirm_btn = <button onClick={()=>this.setConfirmOrderList()}>주문 불러오기</button>
        const confirm_btn = <button onClick={()=>this.confirmOrder()}>주문 승인</button>

        const btn = this.state.isloaded ? confirm_btn : load_confirm_btn

        return (
            <div>
                <div>
                    {btn}
                </div>
                <div>
                    {order_component_list}
                </div>
            </div>
        )
    }
}

function OrderGroup({classname, order_at,price,order_elements, setSelect, dishes, style}){
    
    return(
        <li className={`${classname} component--item_card`} onClick={()=>setSelect(classname)}>
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

export default Confirm
