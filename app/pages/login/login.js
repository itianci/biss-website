import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {observer, inject} from 'mobx-react';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import send from '../../api/index';

import './login.css'

const proto = require('proto')
//<button className="login_button" onClick={(e)=>{this.loginSubmit(e)}}>
//					登录
//				</button>


console.log();

@inject('store')
@observer
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            flag: true,
            unameHelp: '',
            unpwdHelp: '',
            pwd: '',
            loadingHtml: '登录'
        }
        this.handleChange = this.handleChange.bind(this)
    }

    enterLoading = () => {
        let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (this.state.email === '' || this.state.email === null) {
            this.setState({
                unameHelp: "用户名不能为空"

            })
            return false
        } else if (!(regEmail.test(this.state.email))) {
            this.setState({
                unameHelp: "请输入正确的电子邮件地址"

            })
            return false
        } else {
            this.setState({
                unameHelp: ""

            })
        }
        //验证密码
        let pwdVerify = /^(?!\s)((?=.*[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).\S{7,})$/
        if (this.state.pwd === '' || this.state.pwd === null) {
            this.setState({
                unpwdHelp: "密码不能为空"

            })
            return false
        } else if (!(pwdVerify.test(this.state.pwd))) {
            this.setState({
                unpwdHelp: "您输入的密码不正确"

            })
            return false
        } else {
            this.setState({
                unpwdHelp: ""

            })
        }


        /**
         *
         * @测试传输加密...
         * @example
         * 更多加密方式详见：https://github.com/brix/crypto-js
         *
         */

        // console.log(sha256(this.state.email + this.state.pwd), "sha256 加密");
        //console.log(Base64.stringify(this.state.email + this.state.pwd), "Base64 加密");
        console.log(hmacSHA512(this.state.email, this.state.pwd), "hmacSHA512 加密");


        this.setState({email: this.state.email, pwd: this.state.pwd})
        alert('登录成功')

        console.log(this.state.pwd, this.state.email)
        //this.setState({email:this.state.email,pwd:"aaaaaaaa"})

        let param = {email: this.state.email, pwd: "aaaaaaaa"};


        //this.props.store.userStore.Login(param)
        this.setState({loadingHtml: ''});


        send({
            client: proto.biss.api.v1.account.AccountClient,
            req: proto.biss.api.v1.account.LoginReq,
            mothod: 'login',
            param: {account: 'test name...', challenge: '1212313123'},
            callback: function (a, b) {
                console.log(a, 8848);
                console.log(b, 8847);

                //成功后跳转页面
                //this.setState({redirect: true,chkpwdHelp:''});
            }
        });

        let userInfo = Object.assign(this.props.store.userStore.userInfo, {name: 'ai ya', email: '2323@234.com'});
        this.props.store.userStore.setUserInfo(userInfo)

        setTimeout(() => {
            this.props.store.userStore.clearUserInfo()
        }, 5000)

    }


    handleChange() {
        this.setState({flag: !this.state.flag});
    }

    componentDidMount() {
        const {store} = this.props;

        console.log("store:", store);
    }


    handleEmailChange(e) {
        let email = e.target.value.replace(/\s/, '');
        this.setState({email: email})
        console.log(this.state.email, email)
    }

    handlePwdChange(e) {
        let pwd = e.target.value.replace(/\s/, '');
        this.setState({pwd: pwd})
        console.log(this.state.pwd)
    }


    render() {
        const {store} = this.props;
        return (
            <div className="login">
                <div className="login_content">
 					<span className="login_logo">
					LOGO
					</span>
                    <span className="login_title">登录</span>

                    <ul className="login_inputs">
                        <li className={this.state.email !== '' ? 'activeColor' : 'nomalColor'}>
                            <input type="text" name="email" onChange={e => this.handleEmailChange(e)}
                                   value={this.props.email} placeholder="请输入您的电子邮件地址"/>

                        </li>
                        <span className="help-block">{this.state.unameHelp}</span>
                        <li className={this.state.pwd !== '' ? 'activeColor loginInput_pwd' : 'nomalColor loginInput_pwd'}>
                            <input type={this.state.flag ? 'password' : 'text'} name="pwd"
                                   onChange={e => this.handlePwdChange(e)} value={this.props.pwd}
                                   placeholder="请输入您的密码"/>
                            <i className={this.state.pwd == '' ? 'icon-e90e pwdShow' : 'pwdHide icon-e90e'}
                               onClick={() => {
                                   this.handleChange()
                               }}></i>
                        </li>
                        <span className="help-block">{this.state.unpwdHelp}</span>

                    </ul>


                    <button className="login_button" onClick={this.enterLoading}>
                        {this.state.loadingHtml}
                    </button>
                    <ul className="login_footer">
                        <li><Link to="/register">立即注册</Link></li>
                        <li><Link to="/forgotpassword">忘记密码?</Link></li>

                    </ul>


                </div>
            </div>
        )
    }

}

export default Login