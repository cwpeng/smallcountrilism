import React from "react";
import {AppContext} from "../App-Context.js";
import StoryList from "../ui/StoryList.js";
class ChapterPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <>
			<h2>{this.props.chapter.title}</h2>
			<div className="description">{this.props.chapter.description}</div>
			<StoryList stories={this.props.stories} />
		</>;
	}
}
ChapterPage.contextType=AppContext;
export default ChapterPage;