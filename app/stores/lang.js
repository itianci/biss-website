import { observable, action } from 'mobx';

class Language{
    @observable lang = {
        value: 'zh-CN'
    }
}

export default new Language()