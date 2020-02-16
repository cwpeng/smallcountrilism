const section={
	cache:null,
	list:function(datastore){
		return new Promise((resolve, reject)=>{
			if(this.cache===null){
				const query=datastore
					.createQuery("Section")
					.order("update_time", {
						descending:true
					});
				datastore.runQuery(query, (error, sectionEntities)=>{
					if(error===null){
						this.cache=sectionEntities.map((sectionEntity)=>{
							const key=sectionEntity[datastore.KEY];
							return {
								key:key.path[key.path.length-1],
								chapter:sectionEntity.chapter,
								title:sectionEntity.title
							};
						});
						resolve(this.cache);
					}else{
						reject(error);
					}
				});
			}else{
				resolve(this.cache);
			}
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
					this.cache=null;
					resolve();
				}else{
					reject(error);
				}
			});
		});
	}
};
export {section};