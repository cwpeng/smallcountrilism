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
			const sections=this.context.sections.filter((section)=>{
				return section.chapter===this.context.page.chapter;
			});
			const chapter=this.context.chapters.find((chapter)=>{
				return chapter.key===this.context.page.chapter;
			});
			if(this.context.page.section){
				const section=this.context.sections.find((section)=>{
					return section.key===this.context.page.section;
				});
				if(this.context.page.story){ // story page
					page=<StoryPage chapter={chapter} sections={sections} section={section} stories={this.context.page.stories} storyData={this.context.page.storyData} />
				}else{ // section page
					page=<SectionPage chapter={chapter} sections={sections} section={section} stories={this.context.page.stories} />;
				}
			}else{ // chapter page
				page=<ChapterPage chapter={chapter} sections={sections} stories={this.context.page.stories} />;
			}
		}else{ // home page
			page=<HomePage/>;
		}
		return <main>
			{page}
		</main>;
	}
}
Main.contextType=AppContext;
export default Main;