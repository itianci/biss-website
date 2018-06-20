//store中存储一些公用的数据，比如用户数据币种信息等，
//有些信息可能需要随时获取，又不能确定哪个地方会去获取这些信息，这种情况直接定义在对应的文件中，使用时调用。
//如果入口只有一个且调用时机明确，则可以不放在这里。

import userStore from './userStore'
import currency from './currency'
import lang from './lang'
import localStore from './store'

const stores = {userStore, currency, lang , localStore}


export default  stores