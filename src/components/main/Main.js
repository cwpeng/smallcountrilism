import React from "react";
import {AppContext} from "../App-Context.js";
import HomePage from "./HomePage.js";
import ChapterPage from "./ChapterPage.js";
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
			page=<ChapterPage chapter={chapter} sections={sections} />;
		}else{
			page=<HomePage/>;
		}
		return <main>
			{page}
		</main>;
	}
}
Main.contextType=AppContext;
export default Main;