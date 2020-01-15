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
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'file-loader?name=/imgs/[name].[ext]',
			},
		],
	},
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
	},
};
