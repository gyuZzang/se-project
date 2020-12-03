import React, { Component } from 'react';
import api from '../API';
import {Link} from 'react-router-dom'

//api res 찍어볼 것
class NextDeliver extends Component{
    state={
        address:null,
        total_price:null,   
    }
    get_next_delivery=()=>{
        api.get('/order/delivery')
        .then(res =>{
            console.log(res.data.data)
            if(res.data.data==null){
                this.setState({address:""})
            }
            else{
                this.setState({address:res.data.data.rev_address, total_price:res.data.data.total_price})
            }
        })
    }
    finish_delivery=()=>{
        api.post('/order/delivery/finish')
        .then(res => {
            console.log(res)
            if(res.data.description==='OK'){
                alert('완료되었습니다!')
                this.props.history.push('/main_staff')
            }
        })
    }
    render(){
        let address
        let total_price
        let button
        if(this.state.address==null){
            this.get_next_delivery()
        }

        else if(this.state.address===""){
            address="배달할 주문이 존재하지 않습니다."
            total_price="배달할 주문이 존재하지 않습니다."
            button=<Link to='main_staff'>돌아가기</Link>
        }
        else{
            address=this.state.address
            total_price=this.state.total_price
            button=<button onClick={()=>this.finish_delivery()}>배달 완료!</button>
        }

        return(
            <div>
            <div>
                <h3>Destination</h3>
                {address}
            </div>
            <div>
                <h3>Price</h3>
                {total_price}
            </div>
            {button}
        </div>
        )
    }

}

export default NextDeliver