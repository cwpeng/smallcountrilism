import React from "react";
const AppContext=React.createContext();
class AppContextInterface extends React.Component{
	constructor(props){
		super(props);
		this.state=props;
		this.changeChapter=this.changeChapter.bind(this);
	}
	changeChapter(key){
		this.setState({page:{chapter:key}})
	}
	render(){
		return <AppContext.Provider value={{...this.state, changeChapter:this.changeChapter}}>
			{this.props.children}
		</AppContext.Provider>;
	}
}
export {AppContextInterface as default, AppContext};