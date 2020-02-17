import React from "react";
const AppContext=React.createContext();
class AppContextInterface extends React.Component{
	constructor(props){
		super(props);
		this.state=props;
		this.pushToHistoryState=this.pushToHistoryState.bind(this);
		this.changePage=this.changePage.bind(this);
	}
	componentDidMount(){
		window.addEventListener("popstate", (e)=>{
			const page=e.state;
			if(page!==null){
				this.setState({page:{chapter:page.chapter}});
			}
		});
		this.pushToHistoryState();
	}
	pushToHistoryState(){
		const page=this.state.page;
		let url="/";
		let title="";
		if(page.chapter){
			url+=page.chapter;
			title+=page.chapter;
			if(page.section){
				url+="/"+page.section;
				title=page.section+" | "+title;
				if(page.story){
					url+="/"+page.story;
					title=page.story+" | "+title;
				}
			}
		}
		window.history.pushState(page, title, url);
	}
	changePage(e, page){
		e.preventDefault();
		const pageChanged=(page.chapter!==this.state.page.chapter || page.section!==this.state.page.section || page.story!==this.state.page.story);
		const storyChanged=(page.story && page.story!==this.state.page.story);
		if(pageChanged){
			let args=page.chapter?"chapter="+page.chapter+"&":"";
			args+=page.section?"section="+page.section:"";
			let promises=[fetch("/api/story?"+args).then((response)=>{
				return response.json();
			})];
			if(storyChanged){
				promises.push(fetch("/api/story/"+page.story).then((response)=>{
					return response.json();
				}));
			}
			// wait networking and set state
			Promise.all(promises).then((results)=>{
				const stories=results[0].data; // always exists
				const storyResponse=results[1]; // maybe undefined
				page.stories=stories;
				page.storyData=storyResponse?storyResponse.data:undefined;
				this.setState({page:{...this.state.page, ...page}}, this.pushToHistoryState);
			});
		}
	}
	render(){
		return <AppContext.Provider value={{...this.state, changePage:this.changePage}}>
			{this.props.children}
		</AppContext.Provider>;
	}
}
export {AppContextInterface as default, AppContext};