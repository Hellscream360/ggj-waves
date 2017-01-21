const path = require("path");

module.exports = {
	context: __dirname,
	devtool: "source-map",
	entry: {
		main: [
			"babel-polyfill",
			"./src/backend/index.js"
		]
	},
	module: {
		rules: [{
			include: [
				path.resolve(__dirname, "src"),
			],
			test: /\.jsx?$/,
			use: [{
				loader: "babel-loader",
			}],
		}],
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extensions: [
			".js",
			".jsx",
		],
	},
	target: "node",
};
