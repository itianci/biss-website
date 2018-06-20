const path = require("path");

/**
 *
 * 站点基础配置信息
 * @type {{WEBSITE_ROOT_PATH, webpackRelease: {proDirectory: string, resource: string, resourcePrefix: string}, webpackOptions: {entry: {index: string}, resolve: {extensions: string[]}}}}
 * WEBSITE_ROOT_PATH 站点根目录
 * webpackRelease 站点发布相关的配置项
 * ～proDirectory 发布后的文件目录
 * ～resource 待定
 * ～resourcePrefix 待定
 * ~vendor 需要同步到生产目录的文件配置
 *
 */
const config = {

    __HOST_URL_CDN__: 'https://cdn.bootcss.com/',
    __HOST_URL_API__: 'http://10.2.0.5:80',
    WEBSITE_ROOT_PATH: path.resolve(__dirname, '../'),

    webpackRelease: {
        devDirectory: 'WEB_DEV_ROOT',
        proDirectory: 'WEB_ROOT',
        resource: 'resource',
        resourcePrefix: 'xxx',
        vendor: [{
            name: 'Interface',
            from: './vendor',
            to: 'vendor'
        }]
    },
    webpackOptions: {
        entry: {
            index: './app/index.js',
            //第三方引入资源
            vendor: ['react', 'react-dom', 'react-router-dom'],
            //通用组件资源
            common: ['element-react', 'store']
        },
        resolve: {
            extensions: ['.js', '.json', '.jsx', 'css']
        }
    }
};

module.exports = config;
