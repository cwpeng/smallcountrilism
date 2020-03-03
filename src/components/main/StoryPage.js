import React from "react";
import {AppContext} from "../App-Context.js";
import Link from "../ui/Link.js";
class StoryPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const storyData=this.props.storyData;
		const content=storyData.content.split("\n").map((paragraph, index)=>{
			return <React.Fragment key={index}>{paragraph}<br/></React.Fragment>;
		});
		return <>
			<h2>{this.props.chapter.title}</h2>
			<div className="description">{this.props.chapter.description}</div>
			<article className="story">
				<h3 className="title">{storyData.title}</h3>
				<div className="content">{content}</div>
			</article>
		</>;
	}
}
StoryPage.contextType=AppContext;
export default StoryPage;