import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App.js";
import {chapter} from "./dao/chapter.js";
import {tag} from "./dao/tag.js";
import {story} from "./dao/story.js";
const getChaptersAndTags=function(datastore){
	return Promise.all([chapter.list(datastore), tag.list(datastore)]);
};
const renderHomePage=function(datastore){
	return new Promise((resolve, reject)=>{
		getChaptersAndTags(datastore).then((results)=>{
			const chapters=results[0];
			const tags=results[1];
			story.list(datastore, {}).then((stories)=>{
				const page={stories};
				// render
				const root=ReactDOMServer.renderToString(<App chapters={chapters} tags={tags} page={page} />);
				resolve({
					head:{
						title:"小國主義",
						description:"小國主義是用來挽救、鞏固、強化人民信心的主義。喚醒人民對國家，特別是小型國家的認同，進而孕育出精緻堅韌的力量。"
					},
					root,
					initData:{chapters, tags, page}
				});
			}).catch((error)=>{
				reject(error);
			});
		}).catch((error)=>{
			reject(error);
		});
	});
};
const renderChapterPage=function(datastore, chapterKey){
	return new Promise((resolve, reject)=>{
		getChaptersAndTags(datastore).then((results)=>{
			const chapters=results[0];
			const tags=results[1];
			// verify chapter
			const chapter=chapters.find((item)=>{
				return item.key===chapterKey;
			});
			if(!chapter){
				reject("Chapter Not Found");
				return;
			}
			story.list(datastore, {chapter:chapter.key}).then((stories)=>{
				const page={chapter:chapter.key, stories};
				// render
				const root=ReactDOMServer.renderToString(<App chapters={chapters} tags={tags} page={page} />);
				resolve({
					head:{
						title:chapter.title+" - 小國主義",
						description:chapter.description+"小國主義是用來挽救、鞏固、強化人民信心的主義。"
					},
					root,
					initData:{chapters, tags, page}
				});
			}).catch((error)=>{
				reject(error);
			});
		}).catch((error)=>{
			reject(error);
		});
	});
};
const renderStoryPage=function(datastore, storyKey){
	return new Promise((resolve, reject)=>{
		getChaptersAndTags(datastore).then((results)=>{
			const chapters=results[0];
			const tags=results[1];
			story.get(datastore, storyKey).then((storyData)=>{
				if(!storyData){
					reject("Story Not Found");
					return;
				}
				story.list(datastore, {chapter:storyData.chapter}).then((stories)=>{
					const page={story:storyKey, stories, storyData};
					// render
					const root=ReactDOMServer.renderToString(<App chapters={chapters} tags={tags} page={page} />);
					resolve({
						head:{
							title:storyData.title+" - 小國主義",
							description:storyData.abstract+"小國主義是用來挽救、鞏固、強化人民信心的主義。"
						},
						root,
						initData:{chapters, tags, page}
					});
				}).catch((error)=>{
					reject(error);
				});
			}).catch((error)=>{
				reject(error);
			});
		}).catch((error)=>{
			reject(error);
		});
	});
};
const dao={chapter, tag, story};
const renderer={renderHomePage, renderChapterPage, renderStoryPage};
export {renderer, dao};