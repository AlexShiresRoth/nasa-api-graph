const path = require('path');

module.exports = {
	entry: ['@babel/polyfill', './js/index.js'],
	output: {
		path: path.resolve(__dirname, 'src/js'),
		filename: 'bundle.js',
	},
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		contentBase: './',
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['@babel/preset-env'],
				},
			},
		],
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
	},
};
