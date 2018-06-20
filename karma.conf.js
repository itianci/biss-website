/**
 * 模拟真实浏览器单元测试 chrome
 * @param config
 */
module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['mocha'],

        files: [
            'test/*.js',
        ],

        exclude: [
            //配置文件中有jsdom，因此exclude
            'test/mocha.opts.js',
        ],

        preprocessors: {
            'test/*.js': ['webpack']
        },

        client: {
            mocha: {
                reporter: 'html'
            }
        },

        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        //使用babel-loader进行编译
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                    },
                ],
            },
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-webpack'
        ],

        reporters: ['progress'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity
    })
}