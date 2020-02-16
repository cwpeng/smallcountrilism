import React from "react";
import {AppContext} from "../App-Context.js";
class Nav extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let chapters=this.context.chapters.map((chapter)=>{
			return <a
				style={{color:(chapter.key===this.context.page.chapter?"red":"black")}}
				href={"/"+chapter.key}
				onClick={(e)=>{this.context.changePage(e, {chapter:chapter.key, section:undefined, story:undefined});}}
				className="chapter"
				key={chapter.key}
			>{chapter.title}</a>
		});
		return <nav>
			{chapters}
		</nav>;
	}
}
Nav.contextType=AppContext;
export default Nav;