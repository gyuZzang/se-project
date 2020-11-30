import React,{PureComponent,Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import api from '../API';
import Main from '../Main'

//1. 매니저 화면 : 메뉴 및 스타일 리스트 get, 수정, 추가


class ModifyMenu extends PureComponent{
    state={
        Name: "Set 1",
        Price: "26,000",
        Dishes: "pasta, steak, pizza, wine",
        data:null,
        menuList:null,
        selectedMenu:""
    }
    modify_handler = e => {
        this.setState({selectedMenu:e}) 
        
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
        if(this.state.data===null) {       
            this.getMenuListdata()       
        }   
        else{
            //data=this.state.data
            //console.log(data)
            menuList= this.state.data.map((i) => 
            (
                <li className="component--item_card" onClick={()=>this.modify_handler(i.id)} >
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
        }    

        return(      
            <div>
                <ul className="wrap_menu_list">                    
                        {this.state.menuList} 
                        <li className="component--item_card">
                            <h1>
                                +
                            </h1>
                        </li> 
                </ul>   
            </div>
        )
    }
}




export default ModifyMenu