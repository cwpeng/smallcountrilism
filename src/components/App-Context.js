import React from "react";
const AppContext=React.createContext();
class AppContextInterface extends React.Component{
	constructor(props){
		super(props);
		this.state=props;
		this.popFromHistoryState=this.popFromHistoryState.bind(this);
		this.pushToHistoryState=this.pushToHistoryState.bind(this);
		this.changePage=this.changePage.bind(this);
	}
	componentDidMount(){
		window.addEventListener("popstate", this.popFromHistoryState);
		this.pushToHistoryState();
	}
	componentWillUnmount(){
		window.removeEventListener("popstate", this.popFromHistoryState);
	}
	popFromHistoryState(e){
		const page=e.state;
		if(page!==null){
			this.setState({page});
		}
	}
	pushToHistoryState(){
		const page=this.state.page;
		let url="/";
		let title="小國主義";
		if(page.chapter){
			url+=page.chapter;
			title=page.chapter+" | "+title;
		}else if(page.tag){
			url+="tag/"+page.tag;
			title=page.tag+" | "+title;
		}else if(page.story){
			url+="story/"+page.story;
			title=page.story+" | "+title;
		}
		window.history.pushState(page, title, url);
	}
	changePage(e, page){
		e.preventDefault();
		const isSamePage=(page.chapter===this.state.page.chapter && page.tag===this.state.page.tag && page.story===this.state.page.story);
		if(isSamePage){
			return;
		}
		let args;
		if(page.chapter){
			args="chapter="+page.chapter;
		}else if(page.tag){
			args="tag="+page.tag;
		}else if(page.story){
			args="story="+page.story;
		}else{ // homepage
			args="";
		}
		// wait networking and set state
		fetch("/api/story?"+args).then((response)=>{
			return response.json();
		}).then((result)=>{
			page.stories=result.data.stories; // always exists
			page.storyData=result.data.storyData; // maybe undefined
			this.setState({page}, this.pushToHistoryState);
		});
	}
	render(){
		return <AppContext.Provider value={{...this.state, changePage:this.changePage}}>
			{this.props.children}
		</AppContext.Provider>;
	}
}
export {AppContextInterface as default, AppContext};