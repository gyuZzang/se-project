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
                (   <div>
                        <li className="component--item_card" onClick={()=>this.open_modal_handler(i)} >
                            <img src={i.img_url} className="image--itemcard" alt="" />
                            <div className="component--item_text">
                                <h3 >
                                    <span>{i.name}</span>
                                </h3>
                                <p > {i.price}</p>
                            </div>
                        </li>
                        <div><button onClick={()=>this.requestDeleteDish(i.id)}>x</button> </div>
                    </div>
                )
                
            )
            this.state.dishList=dishList;
        }    

        return(      
            <div>
                <ul className="wrap_menu_list">                    
                        {this.state.dishList} 
                        <li className="component--item_card" onClick={()=>this.open_modal_handler()}>
                            <h1>
                                +
                            </h1>
                        </li>   
                </ul> 
                <Modal ariaHideApp={false} isOpen={this.state.modalOpen} onRequestClose={()=>this.close_modify_modal()}>
                    <div>
                        <div className="modifyModal">
                            <span className="close" onClick={()=>this.close_modify_modal()}>
                            &times;
                            </span>
                            <div className="modalContents" onClick={()=>this.state.modalOpen}>
                                <div>                                    
                                    요리 이름
                                    <input
                                        name="name"
                                        className="mod_input input_name"
                                        type="text"
                                        onChange={this.input_handler}
                                    
                                    /> 
                                </div>                                
                                <div>                                    
                                    가격
                                    <input
                                        name="price"
                                        className="mod_input input_price"
                                        type="number"
                                        onChange={this.input_handler}

                                    /> 
                                </div>

                            </div>
                        </div>
                        <button onClick={()=>this.button_handler()}>완료</button>
                    </div>
                </Modal>    
            </div>
        )
    }
}


export default ModifyDish