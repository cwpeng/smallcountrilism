import React from "react";
import {AppContext} from "../App-Context.js";
class Link extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <a
			href={this.props.href}
			onClick={(e)=>{this.context.changePage(e, this.props.page);}}
			className={this.props.className+(this.props.active?" active":"")}
		>{this.props.children}</a>;
	}
}
Link.contextType=AppContext;
export default Link;