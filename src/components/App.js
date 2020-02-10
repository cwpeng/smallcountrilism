import React from "react";
import AppContextInterface from "./App-Context.js";
import Nav from "./nav/Nav.js";
class App extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){}
	render(){
		return <>
			<AppContextInterface>
				<Nav chapters={this.props.chapters} />
				<main>Main</main>
				<footer>Footer</footer>
			</AppContextInterface>
		</>;
	}
}
export default App;