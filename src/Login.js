import React, { Component } from 'react';
import MenuList from './ui/MenuList'
import {Link} from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import api from './API';
import Modal from 'react-modal'
class Login extends Component{
    state={
        modalOpen:false,
        email:"",
        password:"",
        name:"",
        gender:"",
        address:"",
        phone_number:"",
        type:"",
        Login_id:"",
        Login_pw:"",
        isLoggedIn:"false"

    }
    input_handler=(e)=>{
        const{name, value}=e.target
        this.setState({[name]:value})
    }
    signup_handler=()=>{
        const email=this.state.email
        const password=this.state.password
        const gender=this.state.gender
        const name=this.state.name
        const address=this.state.address
        const phone_number=this.state.phone_number
        const type=this.state.type
        api.post('/user/signup',{params:
            {
                "transaction_time": Date(),
                "result_code": "200",
                "description": "OK",
                "data": 
                    {
                        "id": 1,
                        "email": {email},
                        "password": {password},
                        "name": {name},
                        "gender": {gender},
                        "address": {address},
                        "phone_number": {phone_number},
                        "type":{type}
                    }
            }
        })
        .then(res=>{
            Alert("회원가입이 완료되었습니다!")
        })
    }
    login_handler=(e)=>{

        const{name, value}=e.target
        this.setState({[name]:value})
    }
    login_click_handler=()=>{
        //this.props.history.push('/main')

        const email=this.state.Login_id
        const password=this.state.Login_pw
        api.post('/user/login',{params:
            {
                "transaction_time": "",
                "result_code": "200",
                "description": "OK",
                "data": 
                    {
                        "email": {email},
                        "password": {password},
                    }
            }
        })
        .then(res=>{
            console.log(res.data)
            if(res.data.description==="OK"){
                
                alert("로그인 성공!")
                
                //link to main
                this.props.history.auth(res.data.data, {type:'bearer'})
                .push('/main')
            }
            else{
                alert("아이디/비밀번호를 확인해주세요")
            }
        })
    }
    open_signup_modal=()=>{
        this.setState({modalOpen:true})
    }    
    close_signup_modal=()=>{
        this.setState({modalOpen:false})
    }
    render(){
        return(
         
            <div className="main_wrapper">            
                   <div className="header">
                    <h1 className="title">
                        Mr.Daebak Dinner Service
                    </h1>
                </div>
                <div className="login_wrapper">
                    <input
                        name="Login_id"
                        className="loginId"
                        type="text"
                        placeholder="아이디"
                        onChange={this.login_handler}
                    />
                    <input
                        name="Login_pw"
                        className="loginPw"
                        type="password"
                        placeholder="비밀번호"
                        onChange={this.login_handler}
                    />
                    <button className="loginBtn" onClick={this.login_click_handler}>
                        {" "}로그인{" "}
                    </button>
                    <button className="signupBtn" onClick={this.open_signup_modal}> 
                        {" "}회원가입{" "}
                    </button>

                    <Modal isOpen={this.state.modalOpen} onRequestClose={this.close_signup_modal}>
                        <div onClick={this.close_signup_modal}>
                            <div className="signupModal">
                                <span className="close" onClick={this.close_signup_modal}>
                                &times;
                                </span>
                                <div className="modalContents" onClick={this.state.modalOpen}>
                                    <div>                                    
                                        이메일
                                        <input
                                            name="email"
                                            className="mod_input input_email"
                                            type="text"
                                            placeholder="email"
                                            onChange={this.input_handler}
                                        />
                                    </div>
                                    <div>
                                        비밀번호
                                        <input
                                            name="password"
                                            className="mod_input input_password"
                                            type="password"
                                            placeholder="password"
                                            onChange={this.input_handler}
                                        />
                                    </div>
                                    <div>   
                                        이름
                                        <input
                                        name="name"
                                        className="mod_input input_name"
                                        type="text"
                                        placeholder="name"
                                        onChange={this.input_handler}
                                        /> 
                                    </div> 
                                    <div>   
                                        성별                               
                                        <input
                                        name="gender"
                                        className="mod_input input_gender"
                                        type="text"
                                        placeholder="gender"
                                        onChange={this.input_handler}
                                        />
                                    </div> 
                                    <div>
                                        주소
                                        <input
                                            name="address"
                                            className="mod_input input_address"
                                            type="text"
                                            placeholder="address"
                                            onChange={this.input_handler}
                                        />
                                    </div>
                                    <div>
                                        전화번호
                                        <input
                                            name="phone_number"
                                            className="mod_input input_phone_number"
                                            type="text"
                                            placeholder="phone number"
                                            onChange={this.input_handler}
                                        />
                                    </div>
                                    <div>
                                        회원 종류
                                        <select name="type" onChange={this.input_handler}>
                                            <option value="CUSTOMER">
                                                customer
                                            </option>
                                            <option value="MANAGER">
                                                manager
                                            </option>
                                            <option value="COOK">
                                                cook
                                            </option>
                                            <option value="DELIVERYMAN">
                                                delivery man
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button onClick={this.signup_handler}>sign up</button>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Login