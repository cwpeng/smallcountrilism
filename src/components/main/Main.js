import React from "react";
import {AppContext} from "../App-Context.js";
import HomePage from "./HomePage.js";
import ChapterPage from "./ChapterPage.js";
import SectionPage from "./SectionPage.js";
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