import React from "react";
import "./nav.css";
class Nav extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let chapters=this.props.chapters.map((chapter)=>{
			return <div className="chapter">{chapter.title}</div>
		});
		return <nav>
			{chapters}
		</nav>;
	}
}
export default Nav;