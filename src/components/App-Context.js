import React from "react";
const AppContext=React.createContext();
class AppContextInterface extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <AppContext.Provider value={{x:3, y:4}}>
			{this.props.children}
		</AppContext.Provider>;
	}
}
export {AppContextInterface as default, AppContext};