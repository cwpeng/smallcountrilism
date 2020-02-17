import React from "react";
import {AppContext} from "../App-Context.js";
class ChapterPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const sections=this.props.sections.map((section)=>{
			return <a
				href={"/"+this.props.chapter.key+"/"+section.key}
				onClick={(e)=>{this.context.changePage(e, {chapter:this.props.chapter.key, section:section.key, story:undefined});}}
				className="section"
				key={section.key}
			>{section.title}</a>
		});
		const stories=this.props.stories.map((story)=>{
			return <a
				href={"/"+story.chapter+"/"+story.section+"/"+story.key}
				onClick={(e)=>{this.context.changePage(e, {chapter:story.chapter, section:story.section, story:story.key});}}
				className="story"
				key={story.key}
			>{story.title}</a>
		});
		return <>
			<h2>{this.props.chapter.title}</h2>
			<h3>主題分類</h3>
			<div>
				{sections}
			</div>
			<h3>文章列表</h3>
			<div>
				{stories}
			</div>
		</>;
	}
}
ChapterPage.contextType=AppContext;
export default ChapterPage;