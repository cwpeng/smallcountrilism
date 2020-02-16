const chapter={
	cache:null,
	list:function(datastore){
		return new Promise((resolve, reject)=>{
			if(this.cache===null){
				const query=datastore
					.createQuery("Chapter")
					.order("update_time", {
						descending:true
					});
				datastore.runQuery(query, (error, chapterEntities)=>{
					if(error===null){
						this.cache=chapterEntities.map((chapterEntity)=>{
							const key=chapterEntity[datastore.KEY];
							return {
								key:key.path[key.path.length-1],
								title:chapterEntity.title
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
			const chapterEntity={
				key:datastore.key(["Chapter", inputs.key]),
				data:{
					title:inputs.title,
					update_time:Date.now()
				}
			};
			datastore.upsert(chapterEntity, function(error, response){
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
export {chapter};