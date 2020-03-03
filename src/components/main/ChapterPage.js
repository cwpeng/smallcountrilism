import React from "react";
import {AppContext} from "../App-Context.js";
import Link from "../ui/Link.js";
class ChapterPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const stories=this.props.stories.map((story)=>{
			return <Link
				key={story.key}
				active={false}
				href={"/story/"+story.key}
				page={{story:story.key}}
				className="story"
			>
				<h3 className="title">{story.title}</h3>
				<div className="abstract">{story.abstract}</div>
			</Link>
		});
		return <>
			<h2>{this.props.chapter.title}</h2>
			<div className="description">{this.props.chapter.description}</div>
			<section className="stories">
				{stories}
			</section>
		</>;
	}
}
ChapterPage.contextType=AppContext;
export default ChapterPage;