import React,{PureComponent,Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import api from '../API';
import Main from '../Main'


class MenuList extends PureComponent{
    state={
        data:null,
        menuList:null,
        selectedMenu: null
    }
    onFormSubmit = e => {
        this.setState({selectedMenu:e}) 
        this.props.onSubmit(e)
    }
    getMenuListdata(){
        api.get('/menu').then(response =>         
            {
                this.setState({ data:response.data.data })
            }
        )
    }
    // consistMenuList(){
    //     for(var i in this.state.data){
    //         var dishes=[]
    //         for(var j in i.mene_element_list){
    //             dishes.push([j.dish.name, j.quantity])
    //         }
    //         this.state.menuList.push(<MenuElement className="menu_element"
    //             ImageURL={this.state.ImageURL} Name={i.name} Price={i.total_price} Dishes={dishes}></MenuElement>)
    //     }
    // }
    render(){
        let menuList=[]
        let dishList=[]
        if(this.state.data===null) {       
            this.getMenuListdata()       
        }   
        else{
            //data=this.state.data
            //console.log(data)
            menuList= this.state.data.map((i) => 
            { 
                dishList=i.menu_element_list.map((dish) =>{ 
                    console.log(dish)
                    return <p>{dish.dish_name}: {dish.quantity}</p>
                })

                if(i===this.state.selectedMenu)
                {
                    return(
                        <li className="component--item_card_selected" onClick={()=>this.onFormSubmit(i)} >
                            <img src={i.img_url} className="image--itemcard col-sm-3" alt="" />
                            <div className="component--item_text">
                                <h3>
                                    <span >{i.name}</span>
                                </h3>
                                <p> {i.total_price}</p>
                                <p> {dishList}</p>
                            </div>
                        </li>
                    )
                }
                else{
                    return(
                        <li className="component--item_card" onClick={()=>this.onFormSubmit(i)} >
                            <img src={i.img_url} className="image--itemcard col-sm-3" alt="" />
                            <div className="component--item_text">
                                <h3>
                                    <span >{i.name}</span>
                                </h3>
                                <p> {i.total_price}</p>

                            </div>
                        </li>
                    )
                }
            })
            this.state.menuList=menuList;
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

// function MenuElement({ Prop, Id, ImageURL, Name, Price, Dishes }) {
//     if(Id===Prop)
//     {
//         return(
//             <li className="component--item_card_selected" onClick={()=>{}} >
//             <img src={ImageURL} className="image--itemcard" alt="" />
//             <div className="component--item_text">
//                 <h3>
//                     <span >{Name}</span>
//                 </h3>
//                 <p> {Price}</p>
//                 <p> {Dishes}</p>
//             </div>
//         </li>
//         )
//     }
//     else{
//         return (
//         <li className="component--item_card" onClick={()=>{MenuList.setState({selectedMenu:Id})}} >
//             <img src={ImageURL} className="image--itemcard" alt="" />
//             <div className="component--item_text">
//                 <h3>
//                     <span >{Name}</span>
//                 </h3>
//                 <p> {Price}</p>
//                 <p> {Dishes}</p>
//             </div>
//         </li>
//         );
//     }
//   }


export default MenuList