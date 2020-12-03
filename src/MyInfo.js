import React, { Component } from 'react';
import api from './API';
import Modal from 'react-modal'
//api res 찍어볼 것
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
    set_value=()=>{ 
        document.getElementsByName('email')[0].value=this.state.email
        document.getElementsByName('password')[0].value=this.state.password
        document.getElementsByName('gender')[0].value=this.state.gender
        document.getElementsByName("name")[0].value=this.state.name
        document.getElementsByName('address')[0].value=this.state.address
        document.getElementsByName('phone_number')[0].value=this.state.phone_number
    }
    open_modal_handler=async()=>{
        await this.open_modify_modal()
        this.set_value()
    }
    modify_handler=()=>{
        const email=document.getElementsByName('email')[0].value
        const password=document.getElementsByName('password')[0].value
        const gender=document.getElementsByName('gender')[0].value
        const name=document.getElementsByName('name')[0].value
        const address=document.getElementsByName('address')[0].value
        const phone_number=document.getElementsByName('phone_number')[0].value
        api.put('/user',
            {
                "result_code": "200",
                "description": "OK",
                "data": 
                    {
                        email:email,
                        password:password,
                        name:name,
                        gender:gender,
                        address:address,
                        phone_number:phone_number
                    }
            }
        )
        .then(res => {
            console.log(res);
            alert('수정 완료되었습니다!')
            this.close_modify_modal()
            this.getMyInfodata()
        })

    }

    setInfo=async()=>{
        await this.setState({email:this.state.data.email,
            name:this.state.data.name,
            password:this.state.data.password,
            gender:this.state.data.gender,
            address:this.state.data.address,
            phone_number:this.state.data.phone_number
        })

        //this.set_value()
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
                <button onClick={()=>this.open_modal_handler()}>modification</button>
                <Modal isOpen={this.state.modalOpen} onRequestClose={()=>this.close_modify_modal()}>

                    <div>
                        <div className="loginModal">                    
                        <h2>
                        Modify My Info
                    </h2>
                            <span className="close" onClick={()=>this.close_modify_modal()}>
                            &times;
                            </span>
                            <div className="modalContents" onClick={this.state.modalOpen}>
                                <div>
                                email
                                <input
                                    name="email"
                                    className="mod_input input_email"
                                    type="email"
                                    onChange={this.input_handler}
                                /></div><div>
                                password
                                <input
                                    name="password"
                                    className="mod_input input_password"
                                    type="password"
                                    onChange={this.input_handler}

                                /></div>
                                <div>
                                name
                                <input
                                    name="name"
                                    className="mod_input input_name"
                                    type="text"
                                    onChange={this.input_handler}

                                /> </div>
                                <div>
                                gender                               
                                <input
                                name="gender"
                                className="mod_input input_gender"
                                type="text"
                                onChange={this.input_handler}

                            /></div>
                            <div>
                                address
                                <input
                                    name="address"
                                    className="mod_input input_address"
                                    type="text"
                                    onChange={this.input_handler}

                                /></div>
                                <div>
                                phone number
                                <input
                                    name="phone_number"
                                    className="mod_input input_phone_number"
                                    type="text"
                                    onChange={this.input_handler}

                                /></div>
                            </div>
                            <button className="modal_button" onClick={()=>this.modify_handler()}>
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