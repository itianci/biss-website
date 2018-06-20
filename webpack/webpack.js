$module([

    'path',
    'webpack',
    'opn',
    'webpack-merge',
    'html-webpack-plugin',
    'extract-text-webpack-plugin',
    'react-dev-utils/eslintFormatter',
    'optimize-css-assets-webpack-plugin',
    'webpack-bundle-analyzer',
    '../config/index',
    './webpack.utils'

]).then(function (path, webpack, opn, webpackMerge, HtmlWebpackPlugin, ExtractTextPlugin, eslintFormatter, OptimizeCSSPlugin, BundleAnalyzer, configIndex, utils) {

    let entry = configIndex.webpackOptions.entry;
    let BundleAnalyzerPlugin = BundleAnalyzer.BundleAnalyzerPlugin;

    let config = webpackMerge(configIndex.webpackOptions, {

        //输出文件配置 详见：webpack-output
        output: {
            path: path.resolve(utils.isProduction() ? configIndex.webpackRelease.proDirectory : configIndex.webpackRelease.devDirectory),
            filename: utils.isProduction() ? 'js/[name].[chunkhash:8].js' : 'js/[name].js',
            chunkFilename: utils.isProduction() ? 'js/[name]-[id].[chunkhash:8].js' : 'js/[name]-[id].js'
        },

        //插件规则设置 详见 webpack-rules
        module: {
            rules: [

                {
                    test: /\.(js|jsx)$/,
                    loader: 'babel-loader',
                    include: (function () {
                        return utils.isProduction() ? configIndex.WEBSITE_ROOT_PATH + '/app' : [
                            configIndex.WEBSITE_ROOT_PATH + '/app',
                            configIndex.WEBSITE_ROOT_PATH + '/app/pages'
                        ];
                    })(),
                    exclude: configIndex.WEBSITE_ROOT_PATH + '/node_modules/',


                },

                {
                    test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg|swf)$/,
                    loader: utils.isProduction() ? 'url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=' + configIndex.webpackRelease.resourcePrefix + '&outputPath=' + configIndex.webpackRelease.resource + '/' : 'url-loader?name=[name].[ext]&outputPath=' + configIndex.webpackRelease.resource + '/',
                    exclude: configIndex.WEBSITE_ROOT_PATH + '/node_modules/'
                },
                {
                    test: /\.swf$/,
                    loader: 'file?name=js/[name].[ext]'
                }
            ]
        },


        plugins: [

            /**
             * 对外开放全局方式，类似于window、node glob
             * 这些检查和警告通常在生产环境下不必要的，但是他们仍然保留在代码中并且会增加库的体积。通过配置 webpack 的 DefinePlugin 来删除他们
             */
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"'
            }),

            //通过配置生产html可访问文件 详见：https://github.com/jantimon/html-webpack-plugin
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'index.html',
                inject: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunks: ['manifest', 'vendor', 'common', 'index'],
                hash: false,
                chunksSortMode: 'dependency'
            }),

            //common 业务公共代码，vendor引入第三方
            new webpack.optimize.CommonsChunkPlugin({
                name: ['common', 'vendor'],
                filename: utils.isProduction() ? 'js/[name].[chunkhash:8].js' : 'js/[name].js'
            }),
            //防止 vendor hash 变化
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest',
                chunks: ['vendor']
            }),
            //将不符合引入规范的文件单独处理成可以通过requrie方式引入
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                'window.proto': 'proto'
            }),
            //打包优化辅助工具
            new BundleAnalyzerPlugin({
                openAnalyzer: utils.isProduction() ? true : false
            })
        ],

        //排除不需要打入包内的第三方资源，参考资料：webpack官方 externals jquery的例子
        externals: {
            jquery: 'jQuery',
            proto: 'proto'
        }
    });


    utils.isProduction() ? (function () {

        //生产环境配置 production

        config.module.rules.push({
            test: /\.(css|pcss|less)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader!less-loader'
            })
        });

        config.plugins.push(new ExtractTextPlugin('css/[name].[contenthash:8].css'));

        config.plugins.push(new OptimizeCSSPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {
                    removeAll: true
                },
                safe: true
            },
            canPrint: true
        }));

        //压缩代码
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            output: {
                //删除版权信息
                comments: false
            },
            compress: {
                warnings: false
            }
        }));

        config.plugins.push

        //清除 打包后的目录
        config.plugins.push(utils.clean([configIndex.webpackRelease.proDirectory]));
        //拷贝静态资源
        utils.withSource.map(function (data) {
            config.plugins.push(data)
        });
    })() : (function () {

        //开发环境配置 development

        config.module.rules.push({
            test: /\.(css|pcss|less)$/,
            loader: 'style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap',
            exclude: configIndex.WEBSITE_ROOT_PATH + '/node_modules/'
        });
        config.module.rules.push({
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            use: [
                {
                    options: {
                        formatter: eslintFormatter,
                        eslintPath: require.resolve('eslint'),
                        baseConfig: {
                            extends: [require.resolve('eslint-config-react-app')],
                        },
                        useEslintrc: false,
                    },
                    loader: require.resolve('eslint-loader'),
                },
            ],
            include: [
                configIndex.WEBSITE_ROOT_PATH + '/app'
            ],
            exclude: [
                configIndex.WEBSITE_ROOT_PATH + 'node_modules'
            ],
        });

        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.devServer = {
            hot: true,
            inline: true,
            host: '0.0.0.0',
            port: 8080,
            //contentBase:path.resolve(configIndex.webpackRelease.devDirectory),
            historyApiFallback: true,
            disableHostCheck: true,

            after() {
                opn('http://localhost:' + this.port)
            }
        };
    })();


    module.exports = config;
});


/**
 * 惰性加载资源函数
 * @param modules
 * @returns {{then: then}}
 */
function $module(modules) {

    let $m = {};
    modules.forEach(function (item) {
        $m[item] = require(item);
    })

    return {
        then: function (func) {

            let $item = [];

            for (let key in $m) {
                $item.push($m[key]);
            }

            func.apply(null, $item);
        }
    }
}
