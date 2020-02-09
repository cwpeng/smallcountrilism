import React from "react";
import {AppContext} from "../App-Context.js";
class Nav extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		console.log(this.context.x, this.context.y);
		let chapters=this.props.chapters.map((chapter)=>{
			return <div className="chapter">{chapter.title}</div>
		});
		return <nav>
			{chapters}
		</nav>;
	}
}
Nav.contextType=AppContext;
export default Nav;