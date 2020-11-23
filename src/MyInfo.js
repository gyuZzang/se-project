import React, { Component } from 'react';
import api from './API';
import Modal from 'react-modal'
class MyInfo extends Component{
    state={
        infoList:null,
        data:null,
        modalOpen: false,
    }
    getMyInfodata(){
        api.get('/user',{params:{id:''}})
        .then(response => {
            this.setState({data:response.data.data })
            console.log(this.state.data)
        })
    }

    open_modify_modal=()=>{
        this.setState({modalOpen:true})
    }    
    close_modify_modal=()=>{
        this.setState({modalOpen:false})
    }

    render(){
        let info=[]
        if(this.state.data===null){
            this.getMyInfodata()
        }
        else{
            info.push(<InfoElement k='email' val={this.state.data[0].email}></InfoElement>)
            info.push(<InfoElement k='name' val={this.state.data[0].name}></InfoElement>)
            info.push(<InfoElement k='address' val={this.state.data[0].address}></InfoElement>)
            info.push(<InfoElement k='phone number' val={this.state.data[0].phone_number}></InfoElement>)

            
            this.state.infoList=info
        }
        return(
            <div>
                <h1>My Info</h1>
                <button onClick={this.open_modify_modal}>modification</button>
                <Modal isOpen={this.state.modalOpen} onRequestClose={this.close_modify_modal}>
                    <h2>
                        Modify My Info
                    </h2>
                    <button onClick={this.close_modify_modal}>X</button>
                </Modal>
                <div>
                    <ul className="info_list">
                        {this.state.infoList}
                    </ul>
                </div>
            </div>
        )
    }
}
//모달: https://velog.io/@7p3m1k/React-modal-%EB%A1%9C%EA%B7%B8%EC%9D%B8%EC%B0%BD-%EB%A7%8C%EB%93%A4%EA%B8%B0
function InfoElement({k, val}){
    return(
        <li className="info_element">
            <div className="key">
                {k}
            </div>
            <div className="value">
                {val}
            </div>
        </li>
    )
}
export default MyInfo