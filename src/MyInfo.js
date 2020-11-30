import React, { Component } from 'react';
import api from './API';
import Modal from 'react-modal'
class MyInfo extends Component{
    state={
        email:"",
        password:"",
        name:"",
        gender:"",
        address:"",
        phone_number:"",
        infoList:null,
        data:null,
        modalOpen: false,
    }
    getMyInfodata(){
        api.get(`/user`)
        .then(response => {
            this.setState({data:response.data.data})
            console.log(this.state.data)
        })
    }

    open_modify_modal=()=>{
        this.setState({modalOpen:true})
    }    
    close_modify_modal=()=>{
        this.setState({modalOpen:false})
    }
    input_handler=(e)=>{
        const{name, value}=e.target
        this.setState({[name]:value})
    }
    modify_handler=()=>{
        const email=this.state.email
        const password=this.state.password
        const gender=this.state.gender
        const name=this.state.name
        const address=this.state.address
        const phone_number=this.state.phone_number
        
        api.put('/user',
            {
                "result_code": "200",
                "description": "OK",
                "data": 
                    {
                        // "email": {email},            <----- {}를 씌우니까 에러가 나죠
                        // "password": {password},
                        // "name": {name},
                        // "gender": {gender},
                        // "address": {address},
                        // "phone_number": {phone_number}
                        email,
                        password,
                        name,
                        gender,
                        address,
                        phone_number
                    }
            }
        )
        .then(res => {
            console.log(res);
        })

    }

    setInfo=()=>{
        this.setState({email:this.state.data.email,
            name:this.state.data.name,
            gender:this.state.data.gender,
            address:this.state.data.address,
            phone_number:this.state.data.phone_number
        })
    }

    render(){
        let info=[]

        if(this.state.data===null){
            this.getMyInfodata()
        }
        else{
            if(this.state.phone_number==="")
            this.setInfo()
            else{
                info.push(<InfoElement k='email' val={this.state.email}></InfoElement>)
                info.push(<InfoElement k='name' val={this.state.name}></InfoElement>)
                info.push(<InfoElement k='gender' val={this.state.gender}></InfoElement>)
                info.push(<InfoElement k='address' val={this.state.address}></InfoElement>)
                info.push(<InfoElement k='phone number' val={this.state.phone_number}></InfoElement>)

                
                this.state.infoList=info
            }
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
                    <div onClick={this.close_modify_modal}>
                        <div className="loginModal">
                            <span className="close" onClick={this.close_modify_modal}>
                            &times;
                            </span>
                            <div className="modalContents" onClick={this.state.modalOpen}>
                                <input
                                    name="email"
                                    className="mod_input input_email"
                                    type="text"
                                    placeholder={this.state.email}
                                    onChange={this.input_handler}
                                />
                                <input
                                    name="password"
                                    className="mod_input input_password"
                                    type="password"
                                    placeholder={this.state.password}
                                    onChange={this.input_handler}
                                />
                                <input
                                    name="name"
                                    className="mod_input input_name"
                                    type="text"
                                    placeholder={this.state.name}
                                    onChange={this.input_handler}
                                />                                
                                <input
                                name="gender"
                                className="mod_input input_gender"
                                type="text"
                                placeholder={this.state.gender}
                                onChange={this.input_handler}
                            />
                                <input
                                    name="address"
                                    className="mod_input input_address"
                                    type="text"
                                    placeholder={this.state.address}
                                    onChange={this.input_handler}
                                />
                                <input
                                    name="phone_number"
                                    className="mod_input input_phone_number"
                                    type="text"
                                    placeholder={this.state.phone_number}
                                    onChange={this.input_handler}
                                />
                            </div>
                            <button className="loginBtn" onClick={this.modify_handler}>
                                {" "}
                                수정{" "}
                            </button>
                         </div>
                    </div>
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