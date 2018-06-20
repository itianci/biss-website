import React, {Component} from 'react'
import {observable, action} from 'mobx';
import {Link, Redirect} from 'react-router-dom'
import './register.css'
import {inject, observer} from 'mobx-react';
import send from '../../api/index';

const proto = require('proto')

@inject('store')
@observer
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            email: '',
            pwd: '',
            chkpwd: '',
            hideFlag: true,
            hideFlagChk: true,
            emailHelp: '',
            pwdHelp: '',
            chkpwdHelp: '',
            redirect: false
        }


        this.handleChange = this.handleChange.bind(this)
        this.handlePwdChange = this.handlePwdChange.bind(this)
        this.handlechkPwdChange = this.handlechkPwdChange.bind(this)
        this.registerSubmit = this.registerSubmit.bind(this)
    }

    handlepwd() {
        this.setState({hideFlag: !this.state.hideFlag});
    }

    handlepwdChk() {
        this.setState({hideFlagChk: !this.state.hideFlagChk});
    }

    handleChange() {
        this.setState({flag: !this.state.flag});
    }

    handleEmailChange(e) {
        let email = e.target.value.replace(/\s/, '');
        this.setState({email: email})
    }

    handlePwdChange(e) {
        let pwd = e.target.value.replace(/\s/, '');
        this.setState({pwd: pwd})
    }

    handlechkPwdChange(e) {
        let chkpwd = e.target.value.replace(/\s/, '')
        this.setState({chkpwd: chkpwd})

        let equalFlag = chkpwd === this.state.pwd
    }

    registerSubmit() {
        //test tip
        // if(!!this.state.pwd && this.state.chkpwd === this.state.pwd){
        // 	alert('嗯，输入的信息无误，下一步就要提交了。')
        // }else{
        // 	alert('密码和确认密码不一致')
        // }


        //获取changell
        // account.challenge(
        // 	new proto.biss.common.GeneralReq() ,
        // 	{},
        // 	function(a,b){
        // 		console.log('a',a)
        // 		console.log('b',b)

        // 		let param = {}
        // 		register(param);
        // 	}
        // )
        let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        let regPwd = /^(?!\s)((?=.*[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[\d]).\S{7,})$/;
        //验证邮箱
        if (this.state.email == '' || this.state.email === null) {
            this.setState({
                emailHelp: '电子邮箱地址不能为空'
            })
            return false;
        } else if (!(regEmail.test(this.state.email))) {
            this.setState({
                emailHelp: '请输入正确的电子邮件地址'
            })
            return false;
        } else {
            this.setState({
                emailHelp: ''
            })

        }
        //验证密码
        if (this.state.pwd === '' || this.state.pwd === null) {
            this.setState({
                pwdHelp: "密码不能为空"

            })
            return false
        } else if (!(regPwd.test(this.state.pwd))) {
            this.setState({
                pwdHelp: "最少需要8位密码，包括大写字母和数字"

            })
            return false
        } else {
            this.setState({
                pwdHelp: ""

            })
        }

        //验证确认密码
        if (this.state.chkpwd === '' || this.state.chkpwd == null) {
            this.setState({
                chkpwdHelp: '确认您的密码不能为空'
            })
            return false;
        } else if (this.state.chkpwd !== this.state.pwd) {
            this.setState({
                chkpwdHelp: '两次密码输入不一致'
            })
            return false;
        } else {


            let param = {
                email: this.state.email,
                pwd: this.state.pwd
            }

            this.register(param);

        }
    }

    //请求注册接口,处理返回数据
    @action register(_param) {
        let param = _param;

        this.props.store.userStore.setUserInfo(
            {
                email: _param.email,
                name: _param.email,
            }
        )

        console.log(param);
        //暂时写死。
//         let account = new proto.biss.api.v1.account.AccountClient("http://10.2.0.5:80", "h2", {});
//         let registReq = new proto.biss.api.v1.account.RegisterReq()
//         
//         registReq.setEmail(_param.email)
//         registReq.setPubkey('123456')

//         return account.register(registReq, {}, function (a, b) {
//             console.log(a ,8848);
//             console.log( b,8847);

//             //成功后跳转页面
// 			this.setState({redirect: true,chkpwdHelp:''}); 
//         })

        send({
            client: proto.biss.api.v1.account.AccountClient,
            req: proto.biss.api.v1.account.RegisterReq,
            mothod: 'register',
            param: {email: _param.email},
            callback: function (a, b) {
                console.log(a, 8848);
                console.log(b, 8847);

                //成功后跳转页面
                this.setState({redirect: true, chkpwdHelp: ''});
            }
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/registerEmail"/>;
        }
        return (
            <div className="register">
                <div className="register_content">
				<span className="rigister_logo">
					LOGO
				</span>
                    <span className="register_title">注册</span>
                    <div className="register_title_label">
                        <i className="register_whiffletree"></i>
                        <span className="register_title_label_info">开启全新数字货币交易之旅</span>
                        <i className="register_whiffletree"></i>
                    </div>

                    <ul className="register_inputs">
                        <li className={this.state.email !== '' ? 'activeColor' : 'nomalColor'}>
                            <input type="text" name='email' placeholder="输入您的电子邮件"
                                   onChange={e => this.handleEmailChange(e)}/>
                        </li>
                        <span className="help-block">{this.state.emailHelp}</span>
                        <li className={this.state.pwd !== '' ? 'activeColor registerInput' : 'nomalColor registerInput'}>
                            <input type={this.state.hideFlag ? 'password' : 'text'} name='pwd' placeholder="输入您的密码"
                                   onChange={e => this.handlePwdChange(e)}/>
                            <i className={this.state.pwd == '' ? 'icon-e90e pwdShow' : 'pwdHide icon-e90e'}
                               onClick={() => {
                                   this.handlepwd()
                               }}></i>
                        </li>
                        <span className="help-block">{this.state.pwdHelp}</span>
                        <li className={this.state.chkpwd !== '' ? 'activeColor registerInput' : 'nomalColor registerInput'}>
                            <input type={this.state.hideFlagChk ? 'password' : 'text'} name='checkpwd'
                                   placeholder="确认您的密码" onChange={e => this.handlechkPwdChange(e)}/> <i
                            className={this.state.chkpwd == '' ? 'icon-e90e pwdShow' : 'pwdHide icon-e90e'}
                            onClick={() => {
                                this.handlepwdChk()
                            }}></i>
                        </li>
                        <span className="help-block">{this.state.chkpwdHelp}</span>
                    </ul>

                    <div className="register_checkbox">
                        <i
                            className={this.state.flag ? 'icon-e902' : ' noCheckbox '}
                            onClick={() => {
                                this.handleChange()
                            }}
                        ></i>
                        <span>我已阅读并同意</span>
                        <a>《用户协议》</a>
                    </div>


                    <button
                        className={this.state.flag ? 'register_button register_submit' : 'register_button'}
                        onClick={() => {
                            this.registerSubmit()
                        }}
                        disabled={this.state.flag ? false : true}
                    >
                        立即注册
                    </button>

                    <div className="register_jump">
                        <span>已有账号？</span>
                        <Link to='/login'>去登录</Link>
                    </div>
                </div>

            </div>

        )
    }
}

export default Register
