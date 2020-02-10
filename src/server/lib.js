import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App.js";
import {chapter} from "./dao/chapter.js";
import {section} from "./dao/section.js";
import {story} from "./dao/story.js";
const render=function(datastore, inputs){
	return new Promise((resolve, reject)=>{
		Promise.all([chapter.list(datastore), section.list(datastore)]).then((results)=>{
			const chapters=results[0];
			const sections=results[1];
			const root=ReactDOMServer.renderToString(<App chapters={chapters} sections={sections} />);
			resolve({root, initData:{chapters, sections}});
		}).catch((error)=>{
			reject(error);
		});
	});
};
const dao={chapter, section, story};
export {render, dao};