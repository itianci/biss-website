/**
 *@description  该文件使用store来处理本地存储数据，在浏览器缓冲层面实现数据存储，目前主要的目的示存储用户的登录状态和其他的一些基础的需要在浏览器刷新后留存的数据。
 *@description  在store的基础上封装一层，使其使用起来更加简单，之前的store方法还可以正常使用
 *@example  下面方法示例：
 * store(str） //单个获取存储信息 eg. store('username')
 * store(Object) // 批量存储信息   eg. store({username:'asd',age:23})
 * store(str,null) // 单个删除字段存储  eg. store('user',null) 删除user存储信息
 * store(str,{str | object | array}) //存储值，eg. store('user':'zhangsan'), store('info':{'naem':'lisi','age':23})
 * 
 */
var localStore = require('store')

//判断是不是对象
function isObj(obj){
    return Object.prototype.toString.call(obj) === "[object Object]";
}

//判断是不是string
function isStr(str){
    return Object.prototype.toString.call(str) === "[object String]"
}

//判断是不是数组
function isArray(arr){
    return Object.prototype.toString.call(arr) == "[object Array]"
}


const store = function(key, data){
    
    let argm = arguments

    if(argm.length ===0){ //没有参数，什么也不做
        store.each(function(value, key) {
            console.log(key, '==', value)
        });
        return
    }

    if(argm.length ===1){
        if(isStr(key)){
             return localStore.get(key);
        }

        if(isObj(key)){
            for (let a in key){
                localStore.set(a, key[a]);
            }
            return
        }
        
    }

    if(argm.length === 2 && isStr(key)){ //第一个是键值，第二个是值（null，）
        
        if(!data){
            return localStore.remove(key);//data值为空时清除该字段
        }

        if(data && isStr(data)){
            return localStore.set(key,data)
        }

        if(data && (isObj(data) || isArray(data))){
            return localStore.set(key, data);
        }
    }
}

for (let a in localStore.prototype){
 
    store[a] = localStore.prototype[a]
}


/**
     * @description 获取用户信息
     */
    store.getUser = ()=>{
        return localStore.get('user')
    }

    /**
     * @description  存储用户信息
     * @param {Object} param 需要存储的用户信息对象
     */
    store.setUser = (param)=>{
        localStore.set('user',param)
    }

export default store
