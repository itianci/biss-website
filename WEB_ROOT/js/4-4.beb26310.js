webpackJsonp([4],{410:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=n(0),l=function(e){return e&&e.__esModule?e:{default:e}}(s),c=n(46);n(426);var u=function(e){function t(e){o(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={email:"",redirect:!1,emailHelp:""},n}return r(t,e),i(t,[{key:"handleEmailChange",value:function(e){var t=e.target.value.replace(/\s/,"");this.setState({email:t}),console.log(this.state.email,t)}},{key:"handleSubmit",value:function(){var e=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;return""===this.state.email||null===this.state.email?(this.setState({emailHelp:"电子邮箱不能为空"}),!1):e.test(this.state.email)?void this.setState({redirect:!0,emailHelp:""}):(this.setState({emailHelp:"请输入正确的电子邮件地址"}),!1)}},{key:"render",value:function(){var e=this;return this.state.redirect?l.default.createElement(c.Redirect,{push:!0,to:"/foundpassword"}):l.default.createElement("div",{className:"forgotPassword"},l.default.createElement("div",{className:"forgotPassword_content"},l.default.createElement("h5",{className:"forgotPassword_content_h5"},"找回密码"),l.default.createElement("p",{className:"forgotPassword_content_p"},"重置密码后将在24小时内无法进行提币操作"),l.default.createElement("div",{className:"forgotPassword_content_inputCode"},l.default.createElement("input",{type:"text",placeholder:"您的电子邮件",onChange:function(t){return e.handleEmailChange(t)},value:this.props.email})),l.default.createElement("span",{className:"help-block"},this.state.emailHelp),l.default.createElement("button",{className:"forgotPassword_content_button",onClick:function(){e.handleSubmit()}},"下一步")))}}]),t}(s.Component);t.default=u},426:function(e,t,n){var o=n(427);"string"==typeof o&&(o=[[e.i,o,""]]);var a={hmr:!0};a.transform=void 0,a.insertInto=void 0;n(405)(o,a);o.locals&&(e.exports=o.locals)},427:function(e,t,n){t=e.exports=n(404)(!1),t.push([e.i,".forgotPassword {\n  height: 889px;\n  width: 100%;\n  background: #F5F7FC;\n  overflow: hidden;\n}\n.forgotPassword_content {\n  width: 400px;\n  height: 299px;\n  margin: 180px auto 0;\n}\n.forgotPassword_content_h5 {\n  display: inline-block;\n  font-size: 24px;\n  color: #061C3F;\n  line-height: 36px;\n}\n.forgotPassword_content_p {\n  display: block;\n  font-size: 16px;\n  color: #54698D;\n  line-height: 20px;\n}\n.forgotPassword_content_inputCode {\n  height: 20px;\n  width: 380px;\n  padding: 12px 10px;\n  border-bottom: 1px solid #D8DDE6;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  margin-top: 68px;\n}\n.forgotPassword_content_inputCode input {\n  border: none;\n  outline: none;\n  background: none;\n  width: 360px;\n  display: inline-blockblock;\n  height: 20px;\n  font-size: 14px;\n  color: #A8B7C7;\n  line-height: 20px;\n}\n.forgotPassword_content_button {\n  margin-top: 80px;\n  width: 400px;\n  height: 40px;\n  background: #516ADE;\n  border-radius: 2px;\n  border: none;\n  outline: none;\n  cursor: pointer;\n  font-size: 14px;\n  color: #FFFFFF;\n}\n",""])}});