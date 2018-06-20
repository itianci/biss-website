import React,{Component} from 'react'
import './footer.css'

class Footer extends Component {
	render(){
		return (
			<div className="footer">
			<div className="footer_content">
			<div className="footer_content_top">
				<div className="footer_content_top_left">
					<ul className="footer_ul">
						<li>币市 BISS.com</li>
						<li>帮助</li>
						<li>费率</li>
						<li>关于我们</li>
						<li>联系我们</li>
					</ul>
				</div>
				<div className="footer_content_top_right">
					<i className="icon-e90f"></i>
					<i className="icon-e905"></i>
					<i className="icon-e904"></i>
					<i className="icon-e906"></i>
					<i className="icon-e907"></i>
				</div>
			</div>
			<span className="Copyright">Copyright © 2018 biss.com – All rights reserved</span>
			</div>
			</div>
		)
	}
}
export default Footer