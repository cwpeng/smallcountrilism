// Express Server
const express=require("express");
const bodyParser=require("body-parser");
let app=express();
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/:chapter?/:section?/:article?", function(req, res){
	res.render("index");
});
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT=process.env.PORT||8080;
app.listen(PORT, ()=>{
	console.log(`Server listening on port ${PORT}...`);
});