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
        total_price:null,
        selectedDishes:[]
    }
    getDishList=()=>{
        api.get('/dish')
        .then(response => {
            this.setState({dishList:response.data.data })
            console.log(this.state.dishList)
        })
    }
    getSelectedDishes=(i)=>{
        console.log(i.name)
        let id=i.id
        let n=i.name
        api.get(`/menu/${i.id}`)
        .then(async response => {
            let selectedDishes=[]
            for(let j in response.data.data.menu_element_list){
                selectedDishes
                .push({
                    'dish_id':response.data.data.menu_element_list[j].dish_id,
                    'quantity':response.data.data.menu_element_list[j].quantity
                })
            }
            this.setState({selectedDishes:selectedDishes, selectedMenu:id, name:n, selectedType:1})

            this.set_value()
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
    set_value=()=>{ //선택메뉴에 따라 front단 dish quantity 셋팅
        this.state.selectedDishes.map((dish)=>{
            try{
                document.getElementsByName(dish.dish_id)[0].value=dish.quantity
            }
            catch{}
        })
        document.getElementsByName("name")[0].value=this.state.name
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
        console.log(name, value)
    }
    setDishAmount=(dish)=>{
        let selectedDishes=this.state.selectedDishes
        let is_in = false
        let value=Number.parseInt(document.getElementsByName(dish.id)[0].value)
        
        console.log(dish)
        for(var i in selectedDishes)
        {
            if(selectedDishes[i].dish_id===dish.id) 
            {
                selectedDishes[i].quantity=value
                is_in=true
            }
        }
        if(!is_in) selectedDishes.push({'dish_id':dish.id, 'quantity': value})
        this.setState({selectedDishes:selectedDishes})
    }
    // requestDeleteMenu = () => {
    //     api.
    // }
    requestModifyMenu = () => {
        console.log(this.state.selectedMenu,this.state.name,this.state.total_price,this.state.selectedDishes)

        api.put('/menu',{
                transaction_time: new Date().toISOString(),
                result_code: "200",
                description: "OK",
                data: {
                    id: this.state.selectedMenu,
                    name: this.state.name,
                    total_price: this.state.total_price,
                    menu_element_list: this.state.selectedDishes
                },
                pagination: null
            
        })
        .then(res => {
            console.log(res)
            this.close_modify_modal()
            this.getMenuListdata()

        })
    }
    requestCreateMenu = () => {
        console.log(this.state.name,this.state.total_price,this.state.selectedDishes)
        api.post('/menu',{
        
            transaction_time: new Date().toISOString(),
            result_code: "200",
            description: "OK",
            data: 
                {
                    name: this.state.name,
                    total_price: this.state.total_price,
                    menu_element_list: this.state.selectedDishes
                    
                }
        
        })
        .then(res=>{
            this.close_modify_modal()
            this.getMenuListdata()
        })

    }

    requestDeleteMenu=(id)=>{
        this.setState({modalOpen:false})

        console.log(id)
        api.delete(`./menu/${id}`)
        .then(res=>{
            console.log(res)
            if(res.data.description=='OK'){
                alert('삭제완료')
                this.getMenuListdata()

            }
        })
        
    }
    modify_handler = (i) => {
        if(i===undefined){ 
            this.setState({selectedType:0})
        }
        else{
            this.getSelectedDishes(i) 
        }
        this.open_modify_modal()

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
        await this.setState({name:name, total_price:this.getTotalPrice()})

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
            }

        )
    }
 
    render(){
        let menuList=[]
        let dish2amount=[]
        let name=this.state.name
        if(this.state.data===null) {       
            this.getMenuListdata()

        }
        else if(this.state.dishList===null){
             this.getDishList()       

        }   
        else{
            //data=this.state.data
            //console.log(data)
            menuList= this.state.data.map((i) => 
            (
                <div className="row">
                    <div className="col-sm-10">
                    <li className="component--item_card" onClick={()=>this.modify_handler(i)} >
                        <img src={i.img_url} className="image--itemcard col-sm-3" alt="" />
                        <div className="component--item_text">
                            <h3>
                                <span >{i.name}</span>
                            </h3>
                            <p> {i.total_price}</p>
                            <p> {i.dish}</p>
                        </div>
                    </li> 
                    </div>                   
                    <div className="col-sm-2" onClick={()=>this.requestDeleteMenu(i.id)}>&times;</div>
                </div>
                    
            ))
            this.state.menuList=menuList

            dish2amount=this.state.dishList.map((dish)=>
            (<div className="row">
                 <label className="col-sm-5">{dish.name}</label>
                <input type="number" name={dish.id} min="0" onChange={()=>this.setDishAmount(dish)}></input>
            </div>))
            this.state.dish2amount=dish2amount

            if(this.state.selectedDishes!=null){
               this.state.total_price=this.getTotalPrice()
            }
            
        }    

        return(      
            <div>
                <ul className="wrap_menu_list">                    
                        {this.state.menuList} 
                        <li className="row component--item_card" onClick={()=>this.modify_handler()}>
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
                                <h4 className="modal-title">메뉴 설정</h4>
                                </div>
                                <div className="modal-body" onClick={()=>this.state.modalOpen}>
                                    <div className="row">                                    
                                    <label className="col-sm-5">메뉴이름</label>
                                        <input
                                            name="name"
                                            className="mod_input input_name"
                                            type="text"
                                        />
                                        
                                    </div>
                                    {dish2amount}

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




export default ModifyMenu