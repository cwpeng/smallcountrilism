import React from "react";
import {AppContext} from "../App-Context.js";
import Link from "../ui/Link.js";
class Nav extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let chapters=this.context.chapters.map((chapter)=>{
			return <Link
				active={chapter.key===this.context.page.chapter}
				href={"/"+chapter.key}
				page={{chapter:chapter.key, section:undefined, story:undefined}}
				className="chapter"
				key={chapter.key}
				text={chapter.title}
			/>;
		});
		return <nav>
			<div className="chapters">
				{chapters}
			</div>
		</nav>;
	}
}
Nav.contextType=AppContext;
export default Nav;