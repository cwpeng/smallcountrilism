import React from "react";
import AppContextInterface from "./App-Context.js";
import Nav from "./nav/Nav.js";
class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			catalog:null
		};
	}
	componentDidMount(){
		this.setState({
			catalog:{
				chapters:[
					{
						title:"核心論述"
					},
					{
						title:"國際關係"
					},
					{
						title:"產業經濟"
					},
					{
						title:"教育文化"
					},
					{
						title:"時事點評"
					}
				]
			}
		});
	}
	render(){
		if(this.state.catalog===null){
			return <div>Loading</div>
		}
		return <>
			<AppContextInterface>
				<Nav chapters={this.state.catalog.chapters} />
				<main>Main</main>
				<footer>Footer</footer>
			</AppContextInterface>
		</>;
	}
}
export default App;