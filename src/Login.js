import React, { Component } from 'react';
import MenuList from './ui/MenuList'
import {Link} from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import axios from 'axios'
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
        type:"CUSTOMER",
        Login_id:"",
        Login_pw:"",
        isLoggedIn:"false",
        bearer_token:null

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
        console.log(email, password, gender, name,address,phone_number,type)

        fetch('http://localhost/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    result_code: "200",
                    description: "OK",
                    data: 
                        {
                            email:email,
                            password:password,
                            name:name,
                            gender:gender,
                            address:address,
                            phone_number:phone_number,
                            type:type
                        }
                }
            )
        })
        .then(res => res.json())
        .then(res=>{
            console.log(res)
            alert("회원가입이 완료되었습니다!")
        })
    }
    login_handler=(e)=>{

        const{name, value}=e.target
        this.setState({[name]:value})
    }
    login_click_handler=()=>{
        //this.props.history.push('/main')
        this.props.history.push('/main_manager')

        const email=this.state.Login_id
        const password=this.state.Login_pw
        fetch('http://localhost/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    transaction_time: "2020-11-29T01:30:35.92095",
                    result_code: "200",
                    description: "OK",
                    data: {
                        email:email,
                        password:password
                    }
                }
            )
        })
        .then(res => res.json())
        .then(res=>{
            console.log(res.data)
            if(res.description==="OK"){
                this.registerSuccessfulLoginForJwt(res.data);       // <---- request header에 token 추가도 안돼있네요 

                //this.setState({bearer_token:res.data})
                alert("로그인 성공!")
                
                //link to main
                api.get(`/user`)
                .then(response => {
                    console.log(response.data.data.type)
                    switch(response.data.data.type){
                        case 'MANAGER':
                            this.props.history.push('/main_manager')
                            break
                        case 'CUSTOMER':
                            this.props.history.push('/main')
                            break
                        default:
                            this.props.history.push('/main_staff')
                            break
                    }
                })
            }
            else{
                alert("아이디/비밀번호를 확인해주세요")
                this.props.history.push('/')
            }
        })
    }
    
    registerSuccessfulLoginForJwt(token) {

        localStorage.setItem('token', token);
        this.setupAxiosInterceptors();
    }

    setupAxiosInterceptors() {
        api.interceptors.request.use(
            config => {
                const token = localStorage.getItem('token');

                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                // config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });
    }

    isUserLoggedIn() {
        const token = localStorage.getItem('token');
        console.log(token);

        if (token) {
            return true;
        }
        
        return false;
    }

    logout() {
        localStorage.removeItem("token");
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
                    <button className="loginBtn" onClick={()=>this.login_click_handler()}>
                        {" "}로그인{" "}
                    </button>
                    <button className="signupBtn" onClick={()=>this.open_signup_modal()}> 
                        {" "}회원가입{" "}
                    </button>

                    <Modal ariaHideApp={false} isOpen={this.state.modalOpen} onRequestClose={()=>this.close_signup_modal()}>
                        <div>
                            <div className="signupModal">
                                <span className="close" onClick={()=>this.close_signup_modal()}>
                                &times;
                                </span>
                                <div className="modalContents" onClick={()=>this.state.modalOpen}>
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
                                            CUSTOMER
                                            </option>
                                            <option value="MANAGER">
                                            MANAGER
                                            </option>
                                            <option value="COOK">
                                            COOK
                                            </option>
                                            <option value="DELIVERYMAN">
                                            DELIVERYMAN
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button onClick={()=>this.signup_handler()}>sign up</button>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Login