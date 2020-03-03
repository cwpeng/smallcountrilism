// Constants
const cst=require("./constant.js");
// Datastore
const {Datastore}=new require("@google-cloud/datastore");
const datastore=new Datastore();
// Libarary
const lib=require("./server-lib.js");
// Express Server
const express=require("express");
const bodyParser=require("body-parser");
let app=express();
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// API first
// Chapter data
app.get("/api/chapter", function(req, res){
	lib.dao.chapter.list(datastore).then((data)=>{
		res.send({data});
	}).catch((error)=>{
		res.send({error});
	});
});
app.post("/api/chapter", function(req, res){
	const inputs=req.body;
	if(!inputs.key || !inputs.title || !inputs.abstract){
		res.send({error:true});
		return;
	}
	if(inputs.password!==cst.MANAGEMENT_PASSWORD){
		res.send({error:"Invalid Password"});
		return;
	}
	lib.dao.chapter.upsert(datastore, inputs).then(()=>{
		res.send({ok:true});
	}).catch((error)=>{
		res.send({error});
	});
});
// Tag data
app.get("/api/tag", function(req, res){
	lib.dao.tag.list(datastore).then((data)=>{
		res.send({data});
	}).catch((error)=>{
		res.send({error});
	});
});
// Story data
app.post("/api/story", function(req, res){
	const inputs=req.body;
	if(!inputs.chapter || !inputs.tags || !inputs.key || !inputs.title || !inputs.abstract || !inputs.content){
		res.send({error:true});
		return;
	}
	if(inputs.password!==cst.MANAGEMENT_PASSWORD){
		res.send({error:"Invalid Password"});
		return;
	}
	inputs.tags=inputs.tags.split(",");
	lib.dao.story.upsert(datastore, inputs).then(()=>{
		lib.dao.tag.upsert(datastore, inputs.tags).then(()=>{
			res.send({ok:true});
		}).catch((error)=>{
			res.send({error});
		});
	}).catch((error)=>{
		res.send({error});
	});
});
app.get("/api/story", function(req, res){
	if(req.query.story){ // get single story first, then get story list based on single story's chapter
		lib.dao.story.get(datastore, req.query.story).then((storyData)=>{
			lib.dao.story.list(datastore, {chapter:storyData.chapter}).then((stories)=>{
				res.send({data:{stories, storyData}});
			}).catch((error)=>{
				res.send({error});
			});
		}).catch((error)=>{
			res.send({error});
		});
	}else{ // get story list by chapter or tag or all
		lib.dao.story.list(datastore, req.query).then((stories)=>{
			res.send({data:{stories}});
		}).catch((error)=>{
			res.send({error});
		});
	}
});
// Pages after
app.get("/mgr/", function(req, res){
	res.render("mgr");
});
app.get("/", function(req, res){
	lib.renderer.renderHomePage(datastore).then((data)=>{
		res.render("index", data);
	}).catch((error)=>{
		res.render("error", {error});
	});
});
app.get("/tag/:tag?", function(req, res){
	if(!req.params.tag){
		res.redirect("/");
		return;
	}
	lib.renderer.renderTagPage(datastore, req.params.tag).then((data)=>{
		res.render("index", data);
	}).catch((error)=>{
		res.render("error", {error});
	});
});
app.get("/story/:story?", function(req, res){
	if(!req.params.story){
		res.redirect("/");
		return;
	}
	lib.renderer.renderStoryPage(datastore, req.params.story).then((data)=>{
		res.render("index", data);
	}).catch((error)=>{
		res.render("error", {error});
	});
});
app.get("/chapter/:chapter?", function(req, res){
	if(!req.params.chapter){
		res.redirect("/");
		return;
	}
	lib.renderer.renderChapterPage(datastore, req.params.chapter).then((data)=>{
		res.render("index", data);
	}).catch((error)=>{
		res.render("error", {error});
	});
});
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT=process.env.PORT||8080;
app.listen(PORT, ()=>{
	console.log(`Server listening on port ${PORT}...`);
});