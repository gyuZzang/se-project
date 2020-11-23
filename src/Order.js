import React, { Component } from 'react';
import api from './API';
import {Link} from 'react-router-dom'


class Order extends Component{
    state={
        dishList:[
            {
                "id": 5,
                "name": "테스트 요리1",
                "status": "REGISTERED",
                "price": 25000.0000,
                "registered_at": "2020-11-15",
                "unregistered_at": null,
                "created_at": "2020-11-17T20:03:28",
                "created_by": "AdminServer",
                "updated_at": "2020-11-17T20:03:28",
                "updated_by": "AdminServer",
                "dish_element_list": null
            },
            {
                "id": 6,
                "name": "테스트 요리2",
                "status": "REGISTERED",
                "price": 25000.0000,
                "registered_at": "2020-11-16",
                "unregistered_at": null,
                "created_at": "2020-11-17T20:04:28",
                "created_by": "AdminServer",
                "updated_at": "2020-11-17T20:04:28",
                "updated_by": "AdminServer",
                "dish_element_list": null
            }
        ],
        dish2amount:null,
    }
    getDishList(){
        api.get('/dish')//Q:id 왜? TODO: page, size 넣기
        .then(response => {
            this.setState({dishList:response.data })
            console.log(this.state.dishList)
        })
    }
    calc_price(){

    }
    requestOrder(){
        api.post('/user/order',{params:
        {
            transaction_time:new Date(),
            data:{
                id:1,//Q:id 어떻게 부여하지?
                total_price:this.calc_price,
                



            }
        }})//TODO: id props
        .then(response =>{

        })
    }
    setDishAmount(dish,amount){
        this.setState()
    }
//TODO: 이거 안됨 히히
    render(){
        let dish2amount=[]
        if(this.state.dishList===null){
            this.getDishList()
        }
        else{
            dish2amount=this.state.dishList.map((dish)=>
            (<li>
                <div>{dish.name}</div>
                <input type="text" placeholder="0" onChange={this.setDishAmount()}></input>
            </li>))

            this.state.dish2amount=dish2amount
        }
        return(
            <div>
                <h1>수량 변경</h1>
                <div>
                    {this.state.dish2amount}
                </div>
                <button  className="order_button">
                    <Link to='/prevOrder' className="order_button">
                        Order
                    </Link>
                </button>
            </div>
        )
    }
}

// function DishElement({dish, amount}){
//     return(
//         <li>
//             <div>{dish}</div>
//             <input onChange=''>{amount}</input>
//         </li>
//     )
// }
export default Order