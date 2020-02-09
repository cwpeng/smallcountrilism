const story={
	upsert:function(datastore, inputs){
		return new Promise((resolve, reject)=>{
			const storyEntity={
				key:datastore.key(["Story", inputs.key]),
				excludeFromIndexes:[
					"abstract", "content"
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