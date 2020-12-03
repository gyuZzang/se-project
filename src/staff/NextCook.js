import React, { Component } from 'react';
import api from '../API';
import {Link} from 'react-router-dom'

//api res 찍어볼 것
class NextCook extends Component{
    state={
        order_id:null,
        cookingList:null,
        style:null,
    }
    get_next_cook=()=>{
        let order_id
        let style
        let cookingList
        api.get('/order/cook')
        .then(res => {
            //console.log(res.data.data)
            if(res.data.data==null){
                cookingList=[]
            }
            else{
                cookingList=res.data.data.order_element_list
                order_id=res.data.data.id
                style = res.data.data.style
            }
            this.setState({cookingList:cookingList, order_id:order_id, style:style})

        })

    }
    finish_cooking=()=>{
        api.post('/order/cook/finish')
        .then(res => {
            console.log(res)
            if(res.data.description==='OK'){
                alert('완료되었습니다!')
                this.props.history.push('/main_staff')
            }
        })
    }

    render(){
        let DishList           
        let style
        let button
        //console.log(this.state.cookingList)
        if(this.state.cookingList==null){
            this.get_next_cook()
        }
        else if(this.state.cookingList.length===0){
            DishList="요리할 주문 목록이 없습니다!"
            style="style이 존재하지 않습니다."
            button=<Link to='/main_staff'>돌아가기</Link>
            
        }
        else{
            console.log(this.state.cookingList)
            style=this.state.style.name
            DishList=this.state.cookingList.map((dish)=>(
                <DishElement dish_name={dish.dish_name} quantity={dish.quantity}></DishElement>
            ))
            button=<button className="btn col-sm-5" onClick={()=>this.finish_cooking()}>요리완료!</button>
            
        }
        return(
            <div className="main_wrapper">            
            <Link to="/main_staff" className="header">
                <h1 className="title">
                Mr.Daebak Dinner Service</h1>
            </Link>

            <div>
                <div>
                    <h3>cooking List</h3>
                    {DishList}
                </div>
                <div>
                    <h3>Style</h3>
                    {style}
                </div>
                {button}
            </div>
            </div>
        )
    }

}

function DishElement({dish_name, quantity}){
    return(
        <div className="row">
            <div className="col-sm-5">
                {dish_name}  
                </div>
                <div>{quantity}
            </div>

        </div>
    )
}

export default NextCook