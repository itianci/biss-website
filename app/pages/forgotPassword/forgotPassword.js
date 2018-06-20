import React, {Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import './forgotPassword.css'
class ForgotPassword extends Component{
    constructor(props){
        super(props)
        this.state={
        	email:'',
        	redirect:false,
        	emailHelp:''
        }
    }
     handleEmailChange(e) {
        let email = e.target.value.replace(/\s/, '');
        this.setState({email: email})
        console.log(this.state.email, email)
    }
	handleSubmit(){
			let regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (this.state.email === '' || this.state.email === null) {
            this.setState({
                emailHelp:'电子邮箱不能为空'

            }) 
            return false
        }else if (!(regEmail.test(this.state.email))) {
            this.setState({
                emailHelp: "请输入正确的电子邮件地址"

            })
            return false
        } else {
            this.setState({
            		redirect:true,
                emailHelp: ""
				
            })
        }
	
	}
    render(){
    		if (this.state.redirect) {  
		    return <Redirect push to="/foundpassword" />;
		  } 
        return(
            <div className="forgotPassword">
                <div className="forgotPassword_content">
                	<h5 className="forgotPassword_content_h5">找回密码</h5>
                	<p className="forgotPassword_content_p">重置密码后将在24小时内无法进行提币操作</p>
                	
                	
                	<div className="forgotPassword_content_inputCode">
				<input type="text" placeholder="您的电子邮件" onChange={e => this.handleEmailChange(e)}
                                   value={this.props.email}/>
				</div>
				<span className="help-block">{this.state.emailHelp}</span>
				<button className="forgotPassword_content_button" onClick={()=>{this.handleSubmit()}}>下一步</button>
                </div>
            </div>
        )

    }
}

export default ForgotPassword