/**
 * 封装接口调用过程中可以统一处理的部分方便调用。
 * 原则，避免没个业务组件繁复的调用过程
 * 1、
 * 2、
 * 3、
 *
 * api({
 *  client :proto.biss.api.v1.account.AccountClient,
 *  req    :proto.biss.api.v1.account.RegisterReq,
 *  mothod :register,
 *  param:{
 *      email:'xxxxx',
 *      pubkey:'sdfads'
 *  },
 *  meta:{
 *  
 *  },
 *  callback:function(a,b){
 *    //to do ......
 *  }
 * })
 *
 */



const _common = {

    isDataType: function (type) {
        return function (value) {
            return Object.prototype.toString.call(value) === "[object " + type + "]"
        }
    }
};

_common.apiProto = (function (_proto) {
    let o = {};

    function splitProto(proto) {

        for (let k in proto) {

            if (_common.isDataType("Object")(proto[k])) {
                splitProto(proto[k]);
            }
            o[k] = proto[k];
        }
    }

    splitProto(_proto);

    return o;
}(require('proto')));

class Protos {


    constructor() {
        //

    }

    get(name) {

        if (!_common.apiProto[name] || !_common.isDataType("Function")(_common.apiProto[name]))
            throw new Error("参数错误");

        return {

            exec: (...options) => {
                return new _common.apiProto[name](options);
            }
        };

    }

    doc(name) {

    }

}


class ClientProto extends Protos {

    constructor(opts) {
        super();
        let {
            className,
            hostname = 'http://10.2.0.5:80',
            credentials = 'h2',
            options = {}

        } = opts;

        this.item = this.get(className).exec(hostname, credentials, options);
    }

    send() {


    }

}

let client = new ClientProto({
    className: 'AccountClient'
});
let client2 = new ClientProto({
    className: 'AccountClient'
});

console.log(client, 8848);


//缺省情况下的meta信息
let defaultMeta = {}

/**
 * @description 实例化
 * @param _class {class} 该大模块的类对象，如：用户相关  proto.biss.api.v1.account.AccountClient
 */

function instantiation(_class) {
    return new _class("http://10.2.0.5:80", "h2", {});
}

/**
 * @description 设置参数对象。
 * @param {class} 请求特定接口的类，如：用户注册接口  proto.biss.api.v1.account.RegisterReq
 * @param {Object}  对应的要求的参数字段及值，目前没有文档的情况下可以参考特定接口js文件的的toObject方法下字段的设置。
 */
function intiparamObj(_class, _param) {
    let reqInstance = new _class()
    console.log(reqInstance);
    let modName = ''
    for (let i in _param) {
        modName = 'set' + firstLetterToUpper(i)
        console.log("modNamer", modName)
        reqInstance[modName](_param[i])
    }

    return reqInstance;
}

/**
 * @description 调用请求方法方法。
 */

function send(param) {
    let _param = param
    let clientObj = instantiation(param.client)
    let reqInstance = intiparamObj(
        _param.req,
        _param.param
    )

    let _meta = Object.assign(defaultMeta, _param.meta ? _param.meta : {})

    clientObj[_param.mothod](reqInstance, _meta, _param.callback)
}


/**
 * @description 首字母大小
 */
function firstLetterToUpper(str) {
    let _str = str;

    return _str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

export default send









