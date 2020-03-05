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
			<h2>{storyData.title}</h2>
			<article className="story">
				<div className="content">{content}</div>
			</article>
			<Link
				active={false}
				href={"/chapter/"+this.props.chapter.key}
				page={{chapter:this.props.chapter.key}}
				className="chapter"
			>{this.props.chapter.title+" ..."}</Link>
		</>;
	}
}
StoryPage.contextType=AppContext;
export default StoryPage;