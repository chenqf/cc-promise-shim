const fs = require('fs');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack');
const resolve = path.resolve;

module.exports = {
    devtool: 'source-map',
    entry: {'index':resolve(__dirname,'index.js')},
    output: {
        path: resolve(__dirname,'build'),
        filename: '[name].js'//将app文件夹中的两个js文件合并成build目录下的bundle.js文件
    },
    plugins: [
        new UglifyJSPlugin()
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: __dirname,
        compress: true,
        port: 8080,
        inline: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        public: '10.13.1.93'
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        "presets":[
                            'es2015',
                        ],
                        "plugins": [
                            "transform-object-assign",//Object.assign
                            'transform-object-rest-spread',// ... 运算符
                        ]
                    }
                },
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        // root: __dirname, //绝对路径
        extensions: [ '.js', 'jsx','.json', '.scss'],
    }
};
