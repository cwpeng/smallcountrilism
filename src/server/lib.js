import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App.js";
import {chapter} from "./dao/chapter.js";
import {section} from "./dao/section.js";
import {story} from "./dao/story.js";
const render=function(datastore, inputs){
	return new Promise((resolve, reject)=>{
		// get chapter and section data
		Promise.all([chapter.list(datastore), section.list(datastore)]).then((results)=>{
			const chapters=results[0];
			const sections=results[1];
			// verify input data
			// verify chapter
			if(chapters.findIndex((chapter)=>{
				return chapter.key===inputs.chapter;
			})===-1){
				inputs.chapter=inputs.section=inputs.story=undefined;
			}
			// verify section
			if(sections.findIndex((section)=>{
				return section.key===inputs.section;
			})===-1){
				inputs.section=inputs.story=undefined;
			}
			// get story list and story data
			let promises=[story.list(datastore, inputs)];
			if(typeof inputs.story!=="undefined"){
				promises.push(story.get(datastore, inputs.story));
			}
			Promise.all(promises).then((results)=>{
				// build page data
				const page={
					...inputs,
					stories:results[0], // maybe undefined
					story:results[1] // maybe undefined
				};
				// render
				const root=ReactDOMServer.renderToString(<App chapters={chapters} sections={sections} page={page} />);
				resolve({root, initData:{chapters, sections, page}});
			}).catch((error)=>{
				reject(error);
			});
		}).catch((error)=>{
			reject(error);
		});
	});
};
const dao={chapter, section, story};
export {render, dao};