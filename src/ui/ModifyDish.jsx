import React,{PureComponent,Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import api from '../API';
import Modal from 'react-modal'
//modify setstate 제대로 들어가는지 확인

class ModifyDish extends PureComponent{
    state={
        name:null,
        price:null,
        data:null,
        dishList:null,
        selectedDish: null,
        selectedType: null,
    }
    open_modal_handler= async(i) => {
        console.log(i)
        if(i===undefined){ //create
            await this.setState({selectedType:0})
            this.open_modify_modal()

        }
        else{ //modify
            this.setState({selectedType:1, selectedDish:i.id, name:i.name, price:i.price})
            await this.open_modify_modal()
            this.set_value()
        }
    }
    getDishListdata=()=>{
        api.get('/dish')
        .then(response => {
            this.setState({data:response.data.data })
            console.log(this.state.data)
        })
    }

    input_handler=(e)=>{
        const{name,value}=e.target
        console.log(value)
        this.setState({[name]:value})
    }
    set_value=()=>{
        console.log(document.getElementsByName('name'))
        document.getElementsByName('name')[0].value=this.state.name
        document.getElementsByName('price')[0].value=this.state.price
    }

    requestCreateDish=()=>{
        api.post('/dish', {
            transaction_time: "2020-11-17T19:31:16.157704",
            result_code: "200",
            description: "OK",
            data: {
                price:this.state.price,

                name: this.state.name,
                status: "REGISTERED",
                dish_element_list: []
            }
        })
        .then(res => {
            console.log(res)
            if(res.data.description=='OK'){
                this.getDishListdata()
            }
        })
    }
    requestModifyDish=()=>{
        api.put('/dish', {
            transaction_time: "2020-11-17T19:31:16.157704",
            result_code: "200",
            description: "OK",
            data: {
                price:this.state.price,

                id:this.state.selectedDish,
                name: this.state.name,
                status: "REGISTERED",
                dish_element_list: []
            }
        })
        .then(res => {
            console.log(res)
            this.getDishListdata()
        })
    }
    requestDeleteDish=(id)=>{
        api.delete(`/dish/${id}`)
        .then(res =>{
            console.log(res)
            alert('삭제완료')
            this.getDishListdata()
        })
        
    }
    open_modify_modal=()=>{
        this.setState({modalOpen:true})
    }    
    close_modify_modal=()=>{
        this.setState({modalOpen:false})
    }
    button_handler=async()=>{
        const type=this.state.selectedType
        const name = document.getElementsByName("name")[0].value
        const price = document.getElementsByName("price")[0].value

        await this.setState({name:name, price:price})
        this.close_modify_modal()

        if(type===0){
            this.requestCreateDish()
        }
        else if(type===1){
            this.requestModifyDish()
        }
        else console.log('invalid select type')
    }
    render(){
        let dishList=[]
        if(this.state.data===null) {       
            this.getDishListdata()       
        } 
        else{
            dishList= this.state.data.map((i) => 
                (   <div className="row">
                        <div className="col-sm-10">
                        <li className=" component--item_card" onClick={()=>this.open_modal_handler(i)} >
                            <img src={i.img_url} className="image--itemcard col-sm-3" alt="" />
                            <div className="component--item_text">
                                <h3 >
                                    <span>{i.name}</span>
                                </h3>
                                <p > {i.price}</p>
                            </div>
                        </li>
                        </div>
                        <div className="col-sm-2" onClick={()=>this.requestDeleteDish(i.id)}>&times;</div>
                    </div>
                )
                
            )
            this.state.dishList=dishList;
        }    

        return(      
            <div>
                <ul className="wrap_menu_list">                    
                        {this.state.dishList} 
                        <li className="component--item_card col-sm-3" onClick={()=>this.open_modal_handler()}>
                        <div className="col-sm-4"/>

                        <div className="col-sm-4">
                            <h1 >
                                +
                            </h1>
                        </div>
                        </li>   
                </ul> 
                <Modal className="bg-light modal-dialog modal-m" ariaHideApp={false} isOpen={this.state.modalOpen} onRequestClose={()=>this.close_modify_modal()}>
                    <div>
                    <div className="modal-content bg-light signupModal">
                                <div className="modal-header">

                            <span className="close" onClick={()=>this.close_modify_modal()}>
                            &times;
                            </span>
                            <h4 className="modal-title">요리 설정</h4>
                                </div>
                            <div className="modal-body" onClick={()=>this.state.modalOpen}>
                                <div className="row">                                    
                                    <label className="col-sm-5">                                    
                                    요리 이름</label>
                                    <input
                                        name="name"
                                        className="mod_input input_name"
                                        type="text"
                                        onChange={this.input_handler}
                                    
                                    /> 
                                </div>                                
                                <div className="row">                                    
                                    <label className="col-sm-5">가격</label>                                    
                                   
                                    <input
                                        name="price"
                                        className="mod_input input_price"
                                        type="number"
                                        onChange={this.input_handler}

                                    /> 
                                </div>

                            </div>
                            <div className="modal-footer">
                            <button onClick={()=>this.button_handler()}>완료</button>
                            </div>
                            </div>

                        </div>
                </Modal>    
            </div>
        )
    }
}


export default ModifyDish