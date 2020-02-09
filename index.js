// Constants
const cst=require("./constant.js");
// Datastore
const {Datastore}=new require("@google-cloud/datastore");
const datastore=new Datastore();
// Express Server
const express=require("express");
const bodyParser=require("body-parser");
let app=express();
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// API first
// Chapter data
app.get("/api/chapter", function(req, res){
	const query=datastore
		.createQuery("Chapter")
		.order("update_time", {
			descending:true
		});
	datastore.runQuery(query, (error, chapterEntities)=>{
		if(error===null){
			res.send({data:chapterEntities.map((chapterEntity)=>{
				const key=chapterEntity[datastore.KEY];
				return {
					key:key.path[key.path.length-1],
					title:chapterEntity.title
				};
			})});
		}else{
			res.send({error:error});
		}
	});
});
app.post("/api/chapter", function(req, res){
	const data=req.body;
	if(!data.key || !data.title){
		res.send({error:true});
		return;
	}
	if(data.password!==cst.MANAGEMENT_PASSWORD){
		res.send({error:"Invalid Password"});
		return;
	}
	const chapterEntity={
		key:datastore.key(["Chapter", data.key]),
		data:{
			title:data.title,
			update_time:Date.now()
		}
	};
	datastore.upsert(chapterEntity, function(error, response){
		if(error===null){
			res.send({ok:true});
		}else{
			res.send({error:error})
		}
	});
});
// Section data
app.get("/api/section", function(req, res){
	const query=datastore
		.createQuery("Section")
		.order("update_time", {
			descending:true
		});
	datastore.runQuery(query, (error, sectionEntities)=>{
		if(error===null){
			res.send({data:sectionEntities.map((sectionEntity)=>{
				const key=sectionEntity[datastore.KEY];
				return {
					key:key.path[key.path.length-1],
					chapter:sectionEntity.chapter,
					title:sectionEntity.title
				};
			})});
		}else{
			res.send({error:error});
		}
	});
});
app.post("/api/section", function(req, res){
	const data=req.body;
	if(!data.chapter || !data.key || !data.title){
		res.send({error:true});
		return;
	}
	if(data.password!==cst.MANAGEMENT_PASSWORD){
		res.send({error:"Invalid Password"});
		return;
	}
	const sectionEntity={
		key:datastore.key(["Section", data.key]),
		data:{
			chapter:data.chapter,
			title:data.title,
			update_time:Date.now()
		}
	};
	datastore.upsert(sectionEntity, function(error, response){
		if(error===null){
			res.send({ok:true});
		}else{
			res.send({error:error})
		}
	});
});
// Story data
app.post("/api/story", function(req, res){
	const data=req.body;
	if(!data.chapter || !data.section || !data.key || !data.title || !data.abstract || !data.content){
		res.send({error:true});
		return;
	}
	if(data.password!==cst.MANAGEMENT_PASSWORD){
		res.send({error:"Invalid Password"});
		return;
	}
	const storyEntity={
		key:datastore.key(["Story", data.key]),
		excludeFromIndexes:[
			"abstract", "content"
		],
		data:{
			chapter:data.chapter,
			section:data.section,
			title:data.title,
			abstract:data.abstract,
			content:data.content,
			update_time:Date.now()
		}
	};
	datastore.upsert(storyEntity, function(error, response){
		if(error===null){
			res.send({ok:true});
		}else{
			res.send({error:error})
		}
	});
});
// Pages after
app.get("/mgr/", function(req, res){
	res.render("mgr");
});
app.get("/:chapter?/:section?/:article?", function(req, res){
	console.log(req.params.chapter);
	//datastore.createQuery("Chapter").order("order");
	res.render("index");
});
// Listen to the App Engine-specified port, or 8080 otherwise
const PORT=process.env.PORT||8080;
app.listen(PORT, ()=>{
	console.log(`Server listening on port ${PORT}...`);
});