const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCopyAfterBuildPlugin = require("webpack-copy-after-build-plugin");
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';
const none = mode === 'none';

module.exports = {
	entry: {
		bundle: ['./src/main.js']
	},
	resolve: {
		extensions: ['.js', '.html']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		port: 8080
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						skipIntroByDefault: true,
						nestedTransitions: true,
						emitCss: true,
						hotReload: true,
						customElement: true,
						format: 'es'
					}
				}
			},
			{
				test: /\.template$/,
				loader: "html-loader"
			},
			{
				test: /\.css$/,
				use: [
					/**
					 * MiniCssExtractPlugin doesn't support HMR.
					 * For developing, use 'style-loader' instead.
					 * */
					prod ? MiniCssExtractPlugin.loader : 'style-loader',
					'css-loader'
				]
			}
		]
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		// new CopyWebpackPlugin([
		// 	{
		// 		from: 'public/bundle.js',
		// 		to: '../../Svelte-in-react/src/bundle.js',
		// 		force: true
		// 	}
		// ]),
	],
	devtool: prod ? false : 'source-map'
};

if(prod || none){
	module.exports.plugins.push(
		new WebpackCopyAfterBuildPlugin({
			"bundle":
			"../../Svelte-in-react/src/bundle.js",
		  })
	)
}
