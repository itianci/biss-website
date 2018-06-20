const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const siteConfig = require('../config/index');

/**
 *
 * @WebpackUtil
 * @class
 * @实用工具类「webpack」
 * @webpack打包部署所需要的方法集合，这里WebpackUtil类实例提供脚手架工具集合
 */

class WebpackUtil {

    constructor() {


        let rSource = [];

        siteConfig.webpackRelease.vendor.map((data) => {
            rSource.push(new CopyWebpackPlugin([{from: data.from, to: data.to, ignore: ['.*']}]))
        });


        this.withSource = rSource;

    }

    /**

     * clean 方法 清除指定目录
     * @param arr 对象数组形式
     * @returns {状态}
     */
    clean(arr) {
        return (new CleanWebpackPlugin(arr, {root: siteConfig.WEBSITE_ROOT_PATH, verbose: true, dry: false}))
    }

    /**
     * isProduction 方法 判断当前应用的环境
     * @returns {boolean}
     */
    isProduction() {

        return (process.env.NODE_ENV === 'production' ? true : false);
    }

}


module.exports = new WebpackUtil();












