import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App.js";
import {chapter} from "./dao/chapter.js";
import {section} from "./dao/section.js";
import {story} from "./dao/story.js";
const render=function(args){
	//ReactDOMServer.renderToString(<App data={{...args}} />);
	return "Hello";
};
const dao={chapter, section, story};
export {render, dao};