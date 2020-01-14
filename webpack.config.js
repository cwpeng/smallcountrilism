const path=require("path");
module.exports={
	entry:"./src/app.js",
	output:{
		path:path.resolve(__dirname, "views"),
		filename:"app.js"
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:["babel-loader"]
			},
			{
				test:/\.css$/,
				exclude:/node_modules/,
				use:["style-loader", "css-loader"]
			}
		]
	}
};