import React,{PureComponent,Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import api from '../API';
import Main from '../Main'
import Modal from 'react-modal'

//1. 매니저 화면 : 메뉴 및 스타일 리스트 get, 수정, 추가, 삭제
// dish 리스트 수정, 추가


class ModifyMenu extends PureComponent{
    state={
        name: null,
        price: null,
        Dishes:null,
        data:null,
        menuList:null,
        selectedMenu:null,
        dishList:null,
        dish2amount:null,
        selectedType:null,

    }
    getDishList=()=>{
        api.get('/dish')
        .then(response => {
            this.setState({dishList:response.data.data })
            console.log(this.state.dishList)
        })
    }
    getSelectedDishes=(id)=>{
        api.get(`/menu/${id}`)
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
        let sum=0
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
    input_handler=(e)=>{
        const{name, value}=e.target
        this.setState({[name]:value}) 
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
        this.setState({selectedDishes:selectedDishes}).then( this.set_value() )
    }
    //Q: create랑 수정이랑 디시리스트 통합 가능?
    requestModifyMenu = () => {
        api.put('/menu',{
            
                transaction_time: "2020-11-19T18:32:02.202686",
                result_code: "200",
                description: "OK",
                data: {
                    id: 11,
                    name: "테스트 메뉴",
                    total_price: 32500,
                    registered_at: null,
                    unregistered_at: null,
                    created_at: "2020-11-19T18:32:01.976779",
                    created_by: "AdminServer",
                    updated_at: "2020-11-19T18:32:01.976779",
                    updated_by: "AdminServer",
                    menu_element_list: [
                        {
                            id: 1,
                            dish_id: 5,
                            dish_name: "테스트 요리2",
                            quantity: 1
                        },
                        {
                            id: 2,
                            dish_id: 6,
                            dish_name: "테스트 요리3",
                            quantity: 3
                        }
                    ]
                },
                pagination: null
            
        })
        .then(res => {

        })
    }
    requestCreateMenu = () => {
        api.put('/post',{
        
            "transaction_time": "2020-11-19T15:48:24.518395",
            "result_code": "200",
            "description": "OK",
            "data": 
                {
                    "name": "테스트 메뉴",
                    "total_price": "30000",
                    "menu_element_list": [
                        {
                            "dish_id" : 5,
                            "quantity" :1
                        },
                        {
                            "dish_id" : 6,
                            "quantity" :2
                        }
                    ]
                }
        
        })

    }
    requestDeleteMenu=()=>{

    }
    modify_handler = (i) => {
        this.open_modify_modal()
        this.setState({selectedType:i})
    }

    open_modify_modal=()=>{
        this.setState({modalOpen:true})
    }    
    close_modify_modal=()=>{
        this.setState({modalOpen:false})
    }
    button_handler=()=>{
        const type=this.state.selectedType
        if(type===0){
            this.requestCreateMenu()
        }
        else if(type===1){
            this.requestModifyMenu()
        }
        else console.log('invalid select type')
    }
    getMenuListdata(){
        api.get('/menu').then(response =>         
            {
                this.setState({ data:response.data.data })
                console.log(this.state.data)
            }
        )
    }
 
    render(){
        let menuList=[]
        let dish2amount=[]

        if(this.state.data===null) {       
            this.getMenuListdata()       
        }   
        else{
            //data=this.state.data
            //console.log(data)
            menuList= this.state.data.map((i) => 
            (
                <li className="component--item_card" onClick={()=>this.modify_handler(1)} >
                    <img src={i.img_url} className="image--itemcard" alt="" />
                    <div className="component--item_text">
                        <h3>
                            <span >{i.name}</span>
                        </h3>
                        <p> {i.total_price}</p>
                        <p> {i.dish}</p>
                    </div>
                </li>
                    
            ))
            this.state.menuList=menuList

            dish2amount=this.state.dishList.map((dish)=>
            (<li>
                <div>{dish.name}</div>
                <input type="number" name={dish.id} min="0" onChange={()=>this.setDishAmount()}></input>
            </li>))
        }    

        return(      
            <div>
                <ul className="wrap_menu_list">                    
                        {this.state.menuList} 
                        <li className="component--item_card" onClick={()=>this.modify_handler(0)}>
                            <h1>
                                +
                            </h1>
                        </li> 
                </ul>
                <Modal ariaHideApp={false} isOpen={this.state.modalOpen} onRequestClose={()=>this.close_signup_modal()}>
                        <div>
                            <div className="modifyModal">
                                <span className="close" onClick={()=>this.close_signup_modal()}>
                                &times;
                                </span>
                                <div className="modalContents" onClick={()=>this.state.modalOpen}>
                                    <div>                                    
                                        메뉴이름
                                        <input
                                            name="name"
                                            className="mod_input input_name"
                                            type="text"
                                            placeholder="이름"
                                            value=""
                                            onChange={this.input_handler}
                                        />
                                    </div>

                                    {dish2amount}
                                    <div>
                                        가격: {()=>this.getTotalPrice()}
                        
                                        
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




export default ModifyMenu