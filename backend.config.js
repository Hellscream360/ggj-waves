const path = require("path");

module.exports = {
	context: __dirname,
	devtool: "source-map",
	entry: "./src/backend/index.js",
	externals: {},
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
		path: path.resolve(__dirname, "dist/backend"),
	},
	resolve: {
		extensions: [
			".js",
			".jsx",
		],
	},
};
