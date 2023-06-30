const { merge } = require('webpack-merge');
const ModuleFedarationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJSON = require('../package.json');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/marketing/latest/'
    },
    plugins: [
        new ModuleFedarationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js',
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJSON.dependencies
        })
    ]
};

module.exports = merge(commonConfig, prodConfig);