import {observable,action} from 'mobx'
import { deflate } from 'zlib';

class Currency {
    @observable currency = [] //存储币种信息


    /**
     * @name getCurrencyInfo
     * @description 获取币种信息
     */
    @action getCurrencyInfo(){  
        this.currency = [
            {
                name:'btc',
                code:'btc',
                xxx:"2.0",
            },
            {
                name:'etc',
                code:'etc',
                xxx:'6.4334'
            }
        ]
    }
}

export default new Currency();