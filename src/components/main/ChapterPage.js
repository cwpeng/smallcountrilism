import React from "react";
class ChapterPage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const sections=this.props.sections.map((section)=>{
			return <div
				className="section"
				key={section.key}
			>{section.title}</div>
		});
		return <>
			<h2>{this.props.chapter.title}</h2>
			<div>
				{sections}
			</div>
		</>;
	}
}
export default ChapterPage;