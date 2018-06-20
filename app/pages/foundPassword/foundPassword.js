import React, {Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import './foundPassword.css'


class foundPassword extends Component{
    constructor(props){
        super(props)
        this.state={
        
        }
    }
    
    render(){
    		
        return(
            <div className="foundPassword">
               <div className="foundPassword_content">
			<div className="foundPassword_content_title">找回密码</div>
			<div className="foundPassword_content_info">我们向您的邮箱 
			<strong> cody@biss.com </strong> 发送了一封验证邮件
请输入邮件中的验证码。</div>
			<div className="foundPassword_content_sendCode">
			<input type="text" placeholder="输入验证码"/>
			<span onClick={()=>{this.sendEmail()}}>{this.state.dlgTipTxt}</span>
			</div>
			<button className="foundPassword_finished_button">下一步</button>
				
			</div>
            </div>
        )

    }
}

export default foundPassword