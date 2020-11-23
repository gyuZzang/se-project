import React,{PureComponent,Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import api from '../API';


class MenuList extends PureComponent{
    state={
        ImageURL:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8HYRDM27ua4cdwbPY_S7K7SeFRIfuzBoFCg&usqp=CAU",
        Name: "Set 1",
        Price: "26,000",
        Dishes: "pasta, steak, pizza, wine",
        data:null,
        menuList:null
    }
    getMenuListdata(){
        console.log('start')
        api.get('/menu').then(response =>         
            {
                console.log(this.state.data)
                this.setState({ data:response.data.data })
            }
        )
        //return this.state.data
    }
    consistMenuList(){
        for(var i in this.state.data){
            var dishes=[]
            for(var j in i.mene_element_list){
                dishes.push([j.dish.name, j.quantity])
            }
            this.state.menuList.push(<MenuElement className="menu_element"
                ImageURL={this.state.ImageURL} Name={i.name} Price={i.total_price} Dishes={dishes}></MenuElement>)
        }
    }
    render(){
        let menuList=[]
        console.log('state:'+this.state.data)
        if(this.state.data===null) {       
            this.getMenuListdata()
            //.then(()=>{                 
            // }, err => {
            //     console.log(err);
            // })         
        }   
        else if(this.state.menuList===null){
            //data=this.state.data
            //console.log(data)
            menuList= this.state.data.map((i) => (<MenuElement className="menu_element"
                ImageURL={this.state.ImageURL} Name={i.name} Price={i.total_price} Dishes={i.dish}></MenuElement>))
            this.state.menuList=menuList;
        }    
        else {
            console.log(this.state.menuList);
        }
        return(      
            <div>
                <ul className="wrap_menu_list">
                    {this.state.menuList}      
                </ul>   
            </div>
        )
    }
}

function MenuElement({ ImageURL, Name, Price, Dishes }) {
    return (
      <li className="component--item_card" >
        <img src={ImageURL} className="image--itemcard" alt="" />
        <div className="component--item_text">
            <h3>
                <span >{Name}</span>
            </h3>
            <p> {Price}</p>
            <p> {Dishes}</p>
        </div>
      </li>
    );
  }


export default MenuList