import React from "react";
import {AppContext} from "../App-Context.js";
class Nav extends React.Component{
	constructor(props){
		super(props);
		this.state={
			chapter:props.chapters[0].key
		};
		this.changeChapter=this.changeChapter.bind(this);
	}
	changeChapter(key){
		this.setState({chapter:key});
	}
	render(){
		let chapters=this.props.chapters.map((chapter)=>{
			return <div
				style={{color:(chapter.key===this.state.chapter?"red":"black")}}
				onClick={()=>{this.changeChapter(chapter.key);}}
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