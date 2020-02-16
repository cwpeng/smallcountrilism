import React from "react";
import {AppContext} from "../App-Context.js";
class Nav extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let chapters=this.context.chapters.map((chapter)=>{
			return <div
				style={{color:(chapter.key===this.context.page.chapter?"red":"black")}}
				onClick={()=>{this.context.changePage({chapter:chapter.key});}}
				className="chapter"
				key={chapter.key}
			>{chapter.title}</div>
		});
		return <nav>
			{chapters}
		</nav>;
	}
}
Nav.contextType=AppContext;
export default Nav;