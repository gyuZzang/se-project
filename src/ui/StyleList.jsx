import React,{PureComponent,Component,Fragment} from 'react';
import PropTypes from 'prop-types';
import api from '../API';
import Main from '../Main'


class StyleList extends PureComponent{
    state={
        data:null,
        styleList:null,
        selectedStyle: null
    }
    onFormSubmit = e => {
        this.setState({selectedStyle:e}) 
        this.props.onSubmit(e)
    }
    getStyleListdata(){
        api.get('/style').then(response =>         
            {
                console.log(this.state.data)
                this.setState({ data:response.data.data })
            }
        )
    }
    render(){
        let styleList=[]
        if(this.state.data===null) {       
            this.getStyleListdata()       
        }   
        else{
            //data=this.state.data
            //console.log(data)
            styleList= this.state.data.map((i) => 
            { 
                if(i===this.state.selectedStyle)
                {
                    return(
                        <li className="component--item_card_selected" onClick={()=>this.onFormSubmit(i)} >
                            <img src={i.img_url} className="image--itemcard col-sm-3" alt="" />
                            <div className="component--item_text">
                                <h3>
                                    <span >{i.name}</span>
                                </h3>
                                <p> {i.price}</p>
                                <p> {i.style_element_list}</p>
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
                                <p> {i.price}</p>
                                <p> {i.style_element_list}</p>
                            </div>
                        </li>
                    )
                }
            })
            this.state.styleList=styleList;
        }    

        return(      
            <div>
                <ul className="wrap_menu_list">                    
                        {this.state.styleList}   
                </ul>   
            </div>
        )
    }
}


export default StyleList