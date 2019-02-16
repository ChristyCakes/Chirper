const path = require('path');

const CLIENT_DEST = path.join(__dirname, './client/dist');

module.exports = {
    devtool: 'source-map',
    entry: ['babel-polyfill', './client/src/index.js'],
    output: { path: CLIENT_DEST, filename: 'bundle.js' },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/dist/images',
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.(pdf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        publicPath: '/dist/docs',
                        outputPath: 'docs'
                    }
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}