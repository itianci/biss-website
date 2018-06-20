import React,{Component} from 'react'

import './register_email.css'
class RegisterEmail extends Component {
	 state = {
	  dlgTipTxt: '获取验证码',
	  seconds: 5
	};
	sendEmail = () => {
	  let siv = setInterval(() => {
	    this.setState((preState) => ({
	      seconds: preState.seconds - 1,
	      dlgTipTxt: `${this.state.seconds - 1}s后可重发`,
	    }), () => {
	      if (this.state.seconds == 0) {
	      	 clearInterval(siv);
//	      	 this.setState((preState) => ({
//	      seconds: 5,
//	      dlgTipTxt: `重新获取验证码`,
//	    }),

	       
	      }
	    });
	  }, 1000)
	}
	render(){
		return(
			<div className="registerEmail">
			<div className="registerEmail_content">
			<div className="registerEmail_content_title">输入验证码完成注册</div>
			<div className="registerEmail_content_info">我们向您的邮箱 
			<strong> cody@biss.com </strong> 发送了一封邮件，里面包含注册验证码，请输入验证码</div>
			<div className="registerEmail_content_sendCode">
			<input type="text" placeholder="输入验证码"/>
			<span onClick={()=>{this.sendEmail()}}>{this.state.dlgTipTxt}</span>
			</div>
			<button className="register_finished_button">完成注册</button>
				
			</div>
			
			</div>
		)
	}
}
export default RegisterEmail