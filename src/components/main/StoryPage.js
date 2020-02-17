import React from "react";
import {AppContext} from "../App-Context.js";
import Link from "../ui/Link.js";
class StoryPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const sections=this.props.sections.map((section)=>{
			return <Link
				active={section.key===this.props.section.key}
				href={"/"+this.props.chapter.key+"/"+section.key}
				page={{chapter:this.props.chapter.key, section:section.key, story:undefined}}
				className="section"
				key={section.key}
				text={section.title}
			/>;
		});
		const stories=this.props.stories.map((story)=>{
			return <Link
				active={false}
				href={"/"+story.chapter+"/"+story.section+"/"+story.key}
				page={{chapter:story.chapter, section:story.section, story:story.key}}
				className="story"
				key={story.key}
				text={story.title}
			/>;
		});
		return <>
			<h2>{this.props.chapter.title} &gt; {this.props.section.title}</h2>
			<h3>主題分類</h3>
			<div>
				{sections}
			</div>
			<h3>文章標題：{this.props.storyData.title}</h3>
			<div>
				{this.props.storyData.content}
			</div>
			<h3>更多推薦文章</h3>
			<div>
				{stories}
			</div>
		</>;
	}
}
StoryPage.contextType=AppContext;
export default StoryPage;