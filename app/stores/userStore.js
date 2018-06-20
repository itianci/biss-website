import { observable, action } from 'mobx';
import localStore from './store'

class UserStore {
    @observable userInfo = {
        name:'-',
        islogin:false,
        email:'-'

    }   //用户基本信息

      /**
       * @summery {Function} 登录，登录完成后更新存储数据
       * @param param {Object} 登录需要的各种数据，比如用户名密码啥的。或者示加密码
       * 用户登录请求直接放到登录业务组件中，不再在此组件中。
       */

        //   @action Login(param){
        //       //to call login api
        //       console.log("登录成功了，下一步我要设置登录信息了，请后退")
            
        //       let _param = {
        //             name:'哎，我去',
        //             islogin:true,
        //             email:'xxxxxx@34534.com'
        //         }

        //         this.setUserInfo(_param)
        //   }

      /**
       * 
       * @param {Object || String} param  需要设置的用户信息 如果 参数示对象则代表示登录后的用户信息，如果示字符串且示logout，则表示登出，需求设置login状态为false
       */
      @action setUserInfo(param){
          if(Object.prototype.toString.call(param) == "[object String]" && param == "logout"){
            Object.assign(this.userInfo, {islogin:false})
            localStore("userInfo",this.userInfo)
            return
          }

          Object.assign(this.userInfo, param, {islogin:true})
          localStore("userInfo",this.userInfo)
           
      }

      /**
       * @surmmary {Function} 获取用户信息
       * @param param {} 请求需要的数据，比如用户名，用户id啥的。
       */

       @action getUserInfo(){

            return !!this.userInfo.name ? this.userInfo : localStore('userInfo')
       }


       /**
        * @description 清除存储的用户信息
        */

        @action clearUserInfo(){
            localStore('userInfo',null)
        }


}

export default new UserStore()
