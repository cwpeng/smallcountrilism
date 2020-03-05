import React from "react";
class Loading extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <div
			className="loading"
		><div className="progress"></div></div>;
	}
}
export default Loading;