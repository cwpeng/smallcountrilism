const path=require("path");
const serverConfig={
	target:"node",
	mode:"development",
	watch:false,
	entry:"./src/server/lib.js",
	output:{
		libraryTarget:"commonjs-module",
		path:path.resolve(__dirname, ""),
		filename:"server-lib.js"
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
const clientConfig={
	target:"web",
	mode:"development",
	watch:false,
	entry:{
		index:"./src/client/index.js",
		mgr:"./src/client/mgr.js"
	},
	output:{
		path:path.resolve(__dirname, "public"),
		filename:"[name].js"
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
module.exports=[serverConfig, clientConfig];