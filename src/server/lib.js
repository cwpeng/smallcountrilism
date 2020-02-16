import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App.js";
import {chapter} from "./dao/chapter.js";
import {section} from "./dao/section.js";
import {story} from "./dao/story.js";
const render=function(datastore, inputs){
	return new Promise((resolve, reject)=>{
		let promises=[chapter.list(datastore), section.list(datastore)];
		if(typeof inputs.section!=="undefined"){
			promises.push(story.list(inputs.section));
			if(typeof inputs.story!=="undefined"){
				promises.push(story.get(inputs.story));
			}
		}
		Promise.all(promises).then((results)=>{
			const chapters=results[0];
			const sections=results[1];
			const page={
				...inputs,
				storyList:results[2], // maybe undefined
				story:results[3] // maybe undefined
			};
			const root=ReactDOMServer.renderToString(<App chapters={chapters} sections={sections} page={page} />);
			resolve({root, initData:{chapters, sections, page}});
		}).catch((error)=>{
			reject(error);
		});
	});
};
const dao={chapter, section, story};
export {render, dao};