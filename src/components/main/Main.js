import React from "react";
import {AppContext} from "../App-Context.js";
import HomePage from "./HomePage.js";
import ChapterPage from "./ChapterPage.js";
import StoryPage from "./StoryPage.js";
class Main extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let page;
		if(this.context.page.chapter){
			const chapter=this.context.chapters.find((chapter)=>{
				return chapter.key===this.context.page.chapter;
			});
			page=<ChapterPage chapter={chapter} stories={this.context.page.stories} />;
		}else if(this.context.page.story){
			const chapter=this.context.chapters.find((chapter)=>{
				return chapter.key===this.context.page.storyData.chapter;
			});
			page=<StoryPage storyData={this.context.page.storyData} chapter={chapter} stories={this.context.page.stories} />;
		}else{ // home page
			page=<HomePage stories={this.context.page.stories} />;
		}
		return <main>
			{page}
		</main>;
	}
}
Main.contextType=AppContext;
export default Main;