import React, { Component } from 'react';
import api from './API';
import { Link } from 'react-router-dom'
import Modal from 'react-modal'


class Order extends Component{
    state={
        dishList:null, //db 전체 dish 리스트
        stylePrice:0,
        selectedDishes:null, //선택 메뉴의 dish list
        dish2amount:null, //front (html tag)
        payment_type:null,
        address:null,
        comment:null,
        modalOpen:false,
    }
    calc_style_price=()=>{
        api.get(`/style/${this.props.match.params.style}`)
        .then(response => {
            this.setState({stylePrice: response.data.data.price})
        })
    }
    open_order_modal=()=>{
        this.setState({modalOpen:true})
    }    
    close_order_modal=()=>{
        this.setState({modalOpen:false})
    }
    getDishList=()=>{
        api.get('/dish')//Q:id 왜? TODO: page, size 넣기
        .then(response => {
            this.setState({dishList:response.data.data })
            console.log(this.state.dishList)
        })
    }
    getSelectedDishes=()=>{
        api.get(`/menu/${this.props.match.params.menu}`)
        .then(response => {
            let selectedDishes=[]
            for(let i in response.data.data.menu_element_list){
                selectedDishes
                .push({
                    'dish_id':response.data.data.menu_element_list[i].dish_id,
                    'quantity':response.data.data.menu_element_list[i].quantity
                })
            }
            this.setState({selectedDishes:selectedDishes}) 
            //this.setState({selectedDishes:response.data.data.menu_element_list})
        })
    }
    getTotalPrice=()=>{
        let sum=this.state.stylePrice
        this.state.selectedDishes.map((dish)=>{
           for(var i in this.state.dishList){
                if(dish.dish_id===this.state.dishList[i].id)
                {
                    sum += this.state.dishList[i].price * dish.quantity
                }
           }
        })
        return sum
    }
    requestOrder=()=>{
        const selectedDishes=this.state.selectedDishes
        const address=this.state.address
        const payment_type=this.state.payment_type
        const comment=this.state.comment
        const style=this.props.match.params.style
        api.post('/order',{ params:
            {
                transaction_time: Date(), //Q: 되나 이게?
                result_code: "200", //Q: 그냥 이렇게 넣으면 되나여
                description: "OK",
                data: {
                    order_at : Date(),
                    user_id : 1, //Q: 유저 아이디 필요한거신가? 지워도 되는 것인가?
                    rev_address : address,
                    payment_type : payment_type,
                    comment : comment,
                    style : {
                        id : style
                    },
                    order_element_list : selectedDishes
                },
                pagination: { //Q: 뭘 넣어야하나..?
                    total_pages: 1,
                    total_elements: 1,
                    current_page: 2,
                    current_elements: 0
                }
            }})
        .then(response =>{
            console.log(response)
            if(response.data.description==="OK"){
                alert('주문 완료하였습니다.')
                this.props.history.push('/prevOrder')
            }
            else{
                alert('주문 실패하였습니다.')
            }
        })
    }
    set_value=()=>{
        this.state.selectedDishes.map((dish)=>{
            try{
                document.getElementsByName(dish.dish_id)[0].value=dish.quantity
            }
            catch{}
        })
    }
    get_value=(id)=>{
        let selectedDishes=this.state.selectedDishes
        let is_in = false

        for(var i in selectedDishes)
        {
            if(selectedDishes[i].dish_id===id) 
            {
                return selectedDishes[i].quantity
            }
        }
        if(!is_in) return 0
    }
    setDishAmount=(e)=>{
        let selectedDishes=this.state.selectedDishes
        let is_in = false
        let {name,value} = e.target //name: dish id
        name=Number.parseInt(name)
        value=Number.parseInt(value)
        for(var i in selectedDishes)
        {
            if(selectedDishes[i].dish_id===name) 
            {
                selectedDishes[i].quantity=value
                is_in=true
            }
        }
        if(!is_in) selectedDishes.push({'dish_id':name, 'quantity': value})
        this.setState({selectedDishes:selectedDishes})
    }
    input_handler=(e)=>{
        const{name, value}=e.target
        this.setState({[name]:value})
    }
    complete_order=()=>{
        this.close_order_modal()
        this.requestOrder()
    }

//TODO: 이거 안됨 히히
    render(){
        let dish2amount=[]
        let total_price
        if(this.state.dishList===null){
            this.getDishList()
            this.calc_style_price()
        }
        else if(this.state.selectedDishes===null){
            this.getSelectedDishes()
        }
        else{
            dish2amount=this.state.dishList.map((dish)=>
            (<li>
                <div>{dish.name}</div>
                <input type="number" name={dish.id} min="0" onChange={this.setDishAmount}></input>
            </li>))
            //spin box로 구현
            this.set_value()
            total_price=this.getTotalPrice()
        }
        return(
            <div>
                <h1>수량 변경</h1>
                <div>
                    {dish2amount}
                </div>
                <div>
                    <div>total price</div>
                    {total_price}
                </div>
                <button className="order_button" onClick={()=>this.open_order_modal()}>Order</button>
                <Modal ariaHideApp={false} isOpen={this.state.modalOpen} onRequestClose={()=>this.close_order_modal()}>
                        <div onClick={()=>this.close_order_modal()}>
                            <div className="orderModal">
                                <span className="close" onClick={()=>this.close_order_modal()}>
                                &times;
                                </span>
                                <div className="modalContents" onClick={()=>this.state.modalOpen()}>
                                    <div>
                                        배달 주소
                                        <input
                                            name="address"
                                            className="mod_input input_address"
                                            type="text"
                                            placeholder="address"
                                            onChange={this.input_handler}
                                        />
                                    </div>
                                    <div>
                                        결제 수단
                                        <select className="mod_input" name="payment_type" onChange={this.input_handler}>
                                            <option value="CARD">
                                                카드 결제
                                            </option>
                                            <option value="CASH">
                                                현금 결제
                                            </option>
                                            <option value="ACCOUNT">
                                                계좌 이체
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        요청 사항
                                        <input
                                            name="comment"
                                            className="mod_input input_comment"
                                            type="text"
                                            placeholder="comment"
                                            onChange={this.input_handler}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button onClick={()=>this.requestOrder()}>
                                    주문 완료
                            </button>
                        </div>
                    </Modal>
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