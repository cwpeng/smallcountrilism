import React from "react";
import {AppContext} from "../App-Context.js";
import Link from "../ui/Link.js";
class ChapterPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const stories=this.props.stories.map((story)=>{
			return <article key={story.key}>
				<h3 className="title">{story.title}</h3>
				<div className="abstract">{story.abstract}</div>
			</article>
		});
		/*
		const stories=this.props.stories.map((story)=>{
			return <Link
				active={false}
				href={"/story/"+story.key}
				page={{story:story.key}}
				className="story"
				key={story.key}
				text={story.title}
			/>;
		});
		*/
		return <>
			<h2>{this.props.chapter.title}</h2>
			<div className="description">{this.props.chapter.description}</div>
			<section className="articles">
				{stories}
			</section>
		</>;
	}
}
ChapterPage.contextType=AppContext;
export default ChapterPage;