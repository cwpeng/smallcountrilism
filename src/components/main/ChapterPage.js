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
		/*
		const stories=this.props.stories.map((story)=>{
			return <a
				href={"/"+this.props.chapter.key+"/"+section.key}
				onClick={(e)=>{this.context.changePage(e, {chapter:this.props.chapter.key, section:section.key, story:undefined});}}
				className="section"
				key={section.key}
			>{section.title}</a>
		});
		*/
		return <>
			<h2>{this.props.chapter.title}</h2>
			<div>
				{sections}
			</div>
		</>;
	}
}
ChapterPage.contextType=AppContext;
export default ChapterPage;