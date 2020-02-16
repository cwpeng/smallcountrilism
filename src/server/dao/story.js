const story={
	get:function(datastore, key){
		return new Promise((resolve, reject)=>{
			datastore.get(datastore.key(["Story", key]), function(error, entity){
				if(error===null){
					resolve(entity);
				}else{
					reject(error);
				}
			});
		});
	},
	list:function(datastore, inputs){
		return new Promise((resolve, reject)=>{
			let query=datastore.createQuery("Story");
			let properties=["title", "abstract", "update_time"];
			if(inputs.chapter){
				query=query.filter("chapter", "=", inputs.chapter);
				if(inputs.section){
					query=query.filter("section", "=", inputs.section);
				}else{
					properties.push("section");
				}
			}else{
				properties.push("chapter", "section");
			}
			query=query.order("update_time", {
				descending:true
			}).select(properties).limit(10);
			datastore.runQuery(query, (error, storyEntities)=>{
				if(error===null){
					resolve(storyEntities.map((storyEntity)=>{
						const key=storyEntity[datastore.KEY];
						return {
							key:key.path[key.path.length-1],
							title:storyEntity.title,
							abstract:storyEntity.abstract,
							update_time:storyEntity.update_time,
							chapter:storyEntity.chapter?storyEntity.chapter:inputs.chapter,
							section:storyEntity.section?storyEntity.section:inputs.section
						};
					}));
				}else{
					reject(error);
				}
			});
		});
	},
	upsert:function(datastore, inputs){
		return new Promise((resolve, reject)=>{
			const storyEntity={
				key:datastore.key(["Story", inputs.key]),
				excludeFromIndexes:[
					"content"
				],
				data:{
					chapter:inputs.chapter,
					section:inputs.section,
					title:inputs.title,
					abstract:inputs.abstract,
					content:inputs.content,
					update_time:Date.now()
				}
			};
			datastore.upsert(storyEntity, function(error, response){
				if(error===null){
					resolve();
				}else{
					reject(error);
				}
			});
		});
	}
};
export {story};