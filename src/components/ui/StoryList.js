import React from "react";
import Link from "./Link.js";
class StoryList extends React.Component{
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
				<div className="readmore">繼續閱讀 ...</div>
			</Link>
		});
		return <section className="stories">
			{stories}
		</section>;
	}
}
export default StoryList;