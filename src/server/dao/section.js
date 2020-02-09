const section={
	list:function(datastore){
		return new Promise((resolve, reject)=>{
			const query=datastore
				.createQuery("Section")
				.order("update_time", {
					descending:true
				});
			datastore.runQuery(query, (error, sectionEntities)=>{
				if(error===null){
					resolve(sectionEntities.map((sectionEntity)=>{
						const key=sectionEntity[datastore.KEY];
						return {
							key:key.path[key.path.length-1],
							chapter:sectionEntity.chapter,
							title:sectionEntity.title
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
			const sectionEntity={
				key:datastore.key(["Section", inputs.key]),
				data:{
					chapter:inputs.chapter,
					title:inputs.title,
					update_time:Date.now()
				}
			};
			datastore.upsert(sectionEntity, function(error, response){
				if(error===null){
					resolve();
				}else{
					reject(error);
				}
			});
		});
	}
};
export {section};