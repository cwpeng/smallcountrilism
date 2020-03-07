import React from "react";
import {AppContext} from "../App-Context.js";
import Link from "../ui/Link.js";
class StoryPage extends React.Component{
	constructor(props){
		super(props);
		this.share=this.share.bind(this);
	}
	share(){
		FB.ui({
			method:"share",
			href:"https://smallcountrilism.pada-x.com/story/"+this.props.storyKey,
			quote:this.props.storyData.abstract,
			hashtag:"#小國主義"
		}, function(response){});
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
			>{"更多"+this.props.chapter.title+" ..."}</Link>
			<div onClick={this.share} className="facebook">
				<img src="/images/facebook.png" /> 分享這篇文章
			</div>
		</>;
	}
}
StoryPage.contextType=AppContext;
export default StoryPage;