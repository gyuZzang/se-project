import React, { Component } from 'react';
import MenuList from './ui/MenuList'
import {Link} from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import axios from 'axios'
import api from './API';
import Modal from 'react-modal'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
    componentDidMount() {
        document.querySelector('.loginPw').addEventListener("keyup", e => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                document.querySelector('.loginBtn').click();
            }
        })

    }

    input_handler=(e)=>{
        const{name, value}=e.target
        this.setState({[name]:value})
    }
    signup_handler=()=>{
        // const email = document.querySelector('.input_email').value;
        // const password = document.querySelector('.input_password').value;
        // const name = document.querySelector('.input_name').value;
        // const gender = document.querySelector('.input_gender').value;
        // const address = document.querySelector('.input_address').value;
        // const phone_number = document.querySelector('.input_phone_number').value;
    
        // this.setState({
        //     email,
        //     password,
        //     name,
        //     gender,
        //     address,
        //     phone_number
        // })
        
        const type=this.state.type
        //console.log(this.state.email, this.state.password, this.state.gender, this.state.name,this.state.address,this.state.phone_number,type)

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
                            email:this.state.email,
                            password:this.state.password,
                            name:this.state.name,
                            gender:this.state.gender,
                            address:this.state.address,
                            phone_number:this.state.phone_number,
                            type:type
                        }
                }
            )
        })
        .then(res => res.json())
        .then(res=>{
            console.log(res)
            if(res.description=="OK")
            alert("회원가입이 완료되었습니다!")
            else alert("회원가입 실패")
            this.close_signup_modal()
        })
    }
    login_click_handler=()=>{
        //this.props.history.push('/main')
        //this.props.history.push('/main_manager')

        const email = document.getElementsByName("Login_id")[0].value;
        const password = document.getElementsByName("Login_pw")[0].value;
        console.log(email, password)
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
            console.log(res)
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
                    <TextField name="Login_id" className="loginId" type="text" placeholder="ID" />
                    <TextField name="Login_pw" className="loginPw" type="password" placeholder="password"/>
                    
                    <Button className="loginBtn" color="secondary" onClick={()=>this.login_click_handler()}>Login</Button>
                    <Button className="signupBtn" onClick={()=>this.open_signup_modal()}>Sign In</Button>

                    <Modal ariaHideApp={false} isOpen={this.state.modalOpen} onRequestClose={()=>this.close_signup_modal()}>
                        <div>
                            <div className="signupModal">
                                <span className="close" onClick={()=>this.close_signup_modal()}>
                                &times;
                                </span>
                                <div className="modalContents" onClick={()=>this.state.modalOpen}>
                                    <div>        
                                        <label>이메일</label>
                                        <TextField name="email" className="mod_input input_email" type="text" placeholder="email" onChange={this.input_handler}/>    
                                    </div>
                                    <div>
                                        <label>비밀번호</label>
                                        <TextField name="password" className="mod_input input_password" type="password" placeholder="password" onChange={this.input_handler}/>   
                                    </div>
                                    <div>   
                                        <label>이름</label>
                                        <TextField name="name" className="mod_input input_name" type="text" placeholder="name" onChange={this.input_handler}/>
                                    </div> 
                                    <div>   
                                        <label>성별</label>
                                        <TextField name="gender" className="mod_input input_gender" type="text" placeholder="gender" onChange={this.input_handler}/>
                                    </div> 
                                    <div>
                                        <label>주소</label>
                                        <TextField name="address" className="mod_input input_address" type="text" placeholder="address" onChange={this.input_handler}/>
                                    </div>
                                    <div>
                                        <label>전화번호</label>
                                        <TextField name="phone_number" className="mod_input input_phone_number" type="text" placeholder="phone number" onChange={this.input_handler}/>
                                    </div>
                                    <div>
                                        <label>회원 종류</label>
                                        <Select labelId="demo-simple-select-label" name="type" onChange={this.input_handler}>
                                            <MenuItem value={"CUSTOMER"}>고객</MenuItem>
                                            <MenuItem value={"COOK"}>요리사</MenuItem>
                                            <MenuItem value={"DELIVERYMAN"}>배달원</MenuItem>
                                        </Select>
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