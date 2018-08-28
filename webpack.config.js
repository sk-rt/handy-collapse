const webpack = require("webpack");
let outputPath =`${__dirname}/sample`;

module.exports = {
  entry: {
		main: __dirname + "/sample/js/main.js"
	},
	target: "node",
	mode: "development",
	output: {
		path: outputPath,
		publicPath: "",
		filename: "sample.js"
  },
  serve: {
    content: "sample/", 
    open: true, 
    port: 8080,
  },
  module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				query: {
					presets: ["env"],
					comments: false,
					compact: true
				}
      }
      
		]
  }
}