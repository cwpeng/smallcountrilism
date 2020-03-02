const tag={
	cache:null,
	list:function(datastore){
		return new Promise((resolve, reject)=>{
			if(this.cache===null){
				const query=datastore
					.createQuery("Tag")
					.order("popular", {
						descending:true
					});
				datastore.runQuery(query, (error, tagEntities)=>{
					if(error===null){
						this.cache=tagEntities.map((tagEntity)=>{
							const key=tagEntity[datastore.KEY];
							return {
								key:key.path[key.path.length-1],
								popular:tagEntity.popular
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
	upsertOne:function(datastore, tag){
		return new Promise((resolve, reject)=>{
			const tagKey=datastore.key(["Tag", tag]);
			const transaction=datastore.transaction();
			transaction.run().then(()=>{
				transaction.get(tagKey).then((results)=>{
					let tagEntity=results[0];
					let popular;
					if(tagEntity){
						popular=tagEntity.popular+1;
					}else{
						popular=1;
					}
					tagEntity={
						key:tagKey,
						data:{
							popular:popular
						}
					};
					transaction.save(tagEntity);
					transaction.commit();
					resolve();
				}).catch((error)=>{
					transaction.rollback();
					reject(error);
				});
			}).catch((error)=>{
				transaction.rollback();
				reject(error);
			});
		});
	},
	upsert:function(datastore, tags){
		const promises=tags.map((tag)=>{
			return this.upsertOne(datastore, tag);
		});
		return Promise.all(promises);
	}
};
export {tag};