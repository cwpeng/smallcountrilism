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
			<h1 className="headline"><Link
					active={!this.context.page.chapter}
					href="/"
					page={{chapter:undefined, section:undefined, story:undefined}}
					className=""
					text="小國主義"
				/>
			</h1>
			<div className="chapters">
				{chapters}
			</div>
		</nav>;
	}
}
Nav.contextType=AppContext;
export default Nav;