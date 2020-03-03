import React from "react";
import {AppContext} from "../App-Context.js";
import Link from "../ui/Link.js";
class Nav extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let chapters=this.context.chapters.map((chapter)=>{
			let active;
			if(this.context.page.chapter){
				active=chapter.key===this.context.page.chapter;
			}else if(this.context.page.storyData){
				active=chapter.key===this.context.page.storyData.chapter;
			}
			return <Link
				active={active}
				href={"/chapter/"+chapter.key}
				page={{chapter:chapter.key}}
				className="chapter"
				key={chapter.key}
			>{chapter.title}</Link>;
		});
		return <nav>
			<h1 className="headline">
				<Link
					active={!this.context.page.chapter}
					href="/"
					page={{chapter:undefined, section:undefined, story:undefined}}
					className=""
				>小國主義</Link>
			</h1>
			<div className="chapters">
				{chapters}
			</div>
		</nav>;
	}
}
Nav.contextType=AppContext;
export default Nav;