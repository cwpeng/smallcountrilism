import React from "react";
import AppContextInterface from "./App-Context.js";
import Nav from "./nav/Nav.js";
import Main from "./main/Main.js";
class App extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){}
	render(){
		return <div id="app">
			<AppContextInterface {...this.props}>
				<Nav/>
				<Main/>
			</AppContextInterface>
		</div>;
	}
}
export default App;