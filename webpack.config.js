const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './public/index.js',
	devServer: {
		port: 3000,
	},
	module: {
		rules: [
			{test: /\.(js)$/, exclude: /node_modules/, use: 'babel-loader'},
			{
				test: /.(scss|css)$/,
				exclude: /node_modules/,
				use:[
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							reloadAll:true
						}
					},
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.handlebars$/,
				loader: 'handlebars-loader',
				options: {
					partialDirs: [
						path.resolve(__dirname, 'public/components/FormsItem'),
						path.resolve(__dirname, 'public/components/Navbar'),
						path.resolve(__dirname, 'public/components/ProfileMenu'),
						path.resolve(__dirname, 'public/components/pages/Form'),
						path.resolve(__dirname, 'public/components/pages/Forms'),
						path.resolve(__dirname, 'public/components/pages/Index'),
						path.resolve(__dirname, 'public/components/pages/Login'),
						path.resolve(__dirname, 'public/components/pages/Profile'),
						path.resolve(__dirname, 'public/components/pages/Signup'),
					]
				}
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index_bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({template: './public/index.html'})
	],
	mode: "production"
}
