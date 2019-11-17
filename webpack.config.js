const webpack = require('webpack')
const path = require('path')

const appPath = path.resolve(__dirname,'src/client')

module.exports = {
    mode: 'development',
    entry: {
        polyfill: 'babel-polyfill', 
        main: appPath+'/index.js'
    },
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            presets: ['@babel/preset-react',
                                '@babel/preset-env'
                            ]
                        }
                    }
                ]
            }
        ]
    }
}
