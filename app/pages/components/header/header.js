import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {observer, inject} from 'mobx-react';


import './header.css'
import { Button } from 'element-react';



function UserLogout(props) {
    return <div className="header_content_right_nologin">

        <ul className="login_registe_button">
            <li>
                <Link to="/login">登陆</Link>
            </li>
            <li>
                <Link to="/register">注册</Link>
            </li>

        </ul>
		
        <div className="vertic_line"></div>


    </div>
}

function UserLogin(props) {
    return <div className="header_content_right_login">

        <ul className="noLogin_title">
            <li>
                <i className="icon-e910"></i>
                <span>资产</span>
            </li>
            <li>
                <i className="icon-e900"></i>
                <span>委托</span>
            </li>
            <li>
                <i className="icon-e901"></i>
                <span>{props.store.userStore.userInfo.name}</span>
            </li>
        </ul>


        <div className="vertic_lines"></div>

    </div>
}


@inject('store')
@observer
class Header extends Component {
    constructor(props) {
        super(props)

    }
componentDidMount() {
    this.nameHide();
  }
nameHide(){

		
}
    render() {
        let loginstr = null;
        console.log("this.props.store.userStore.userInfo.islogin :", this.props.store.userStore.userInfo.islogin)
        //this.props.store.userStore.Login
        if (this.props.store.userStore.userInfo.islogin) {
            loginstr = <UserLogin store={this.props.store}/>
        } else {
            loginstr = <UserLogout/>
        }


        return (
            <div className="Header">
                <div className="Header_content">
                    <div className="header_content_left">
                        <ul className="header_label_list">
                            <li><Link to="/">logo</Link></li>
                            <li>
                                <Link to="/">首页</Link>
                            </li>
                            <li><Link to="/">交易中心</Link></li>
                            <li><Link to="/">帮助中心</Link></li>
                            <li><Link to="/">APP下载</Link></li>
                            <li><Link to="/">公告中心</Link></li>
                        </ul>
                    </div>
                    <div className="header_content_right">
                        {loginstr}
                    </div>
                </div>
            </div>
        )
    }
}

export default Header