import React from "react";
class HomePage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		const stories=this.props.stories.map((story)=>{
			return <article>
				<h3 className="title">{story.title}</h3>
				<div className="abstract">{story.abstract}</div>
			</article>
		});
		return <>
			<h2>小國主義 (Smallcountrilism)</h2>
			<section class="articles">
				{stories}
			</section>
		</>;
	}
}
export default HomePage;