const webpack = require('webpack');

module.exports = {
	entry: {
		index: './app.js',
		vendor: './vendor.js'
	},
	output: {
		path: './dist',
		publicPath: '/dist/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{test: /\.css/,loader: 'style-loader!css-loader'},
			{test: /\.html/,loader: 'ngtemplate!html-loader'}
		]
	}
}