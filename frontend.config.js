const path = require("path");

module.exports = {
	context: __dirname,
	devtool: "source-map",
	entry: "./src/frontend/index.js",
	externals: {
		phaser: "Phaser",
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
		path: path.resolve(__dirname, "public/js/app"),
	},
	resolve: {
		extensions: [
			".js",
			".jsx",
		],
	},
};
