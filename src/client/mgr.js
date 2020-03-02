import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			error:null,
			password:"",
			chapters:[],
			createChapter:{
				key:"", title:"", description:""
			},
			createStory:{
				chapter:"", tags:"", key:"", title:"", abstract:"", content:""
			}
		};
		this.changePassword=this.changePassword.bind(this);
		this.changeCreateChapterInput=this.changeCreateChapterInput.bind(this);
		this.createChapter=this.createChapter.bind(this);
		this.changeCreateStoryInput=this.changeCreateStoryInput.bind(this);
		this.createStory=this.createStory.bind(this);
	}
	componentDidMount(){
		// get chapters
		fetch("/api/chapter").then((response)=>{
			return response.json();
		}).then((result)=>{
			if(result.error){
				this.setState({error:result.error});
				window.setTimeout(()=>{
					this.setState({error:null});
				}, 3000);
			}else{
				this.setState({chapters:result.data});
			}
		});
	}
	changePassword(e){
		this.setState({password:e.currentTarget.value});
	}
	changeCreateChapterInput(e){
		let createChapter={...this.state.createChapter};
		createChapter[e.currentTarget.getAttribute("data-field")]=e.currentTarget.value;
		this.setState({createChapter});
	}
	createChapter(e){
		e.preventDefault();
		fetch("/api/chapter", {
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({...this.state.createChapter, password:this.state.password})
		}).then((response)=>{
			return response.json();
		}).then((result)=>{
			if(result.error){
				this.setState({error:result.error});
				window.setTimeout(()=>{
					this.setState({error:null});
				}, 3000);
			}else{
				this.setState({createChapter:{
					key:"", title:"", description:""
				}});
			}
		});
	}
	changeCreateStoryInput(e){
		let createStory={...this.state.createStory};
		createStory[e.currentTarget.getAttribute("data-field")]=e.currentTarget.value;
		this.setState({createStory});
	}
	createStory(e){
		e.preventDefault();
		if(this.state.createStory.chapter===""){
			this.setState({error:"Select Chapter First"})
			return;
		}
		fetch("/api/story", {
			method:"post",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({...this.state.createStory, password:this.state.password})
		}).then((response)=>{
			return response.json();
		}).then((result)=>{
			if(result.error){
				this.setState({error:result.error});
				window.setTimeout(()=>{
					this.setState({error:null});
				}, 3000);
			}else{
				this.setState({createStory:{
					chapter:"", tags:"", key:"", title:"", abstract:"", content:""
				}});
			}
		});
	}
	render(){
		let error=null;
		if(this.state.error!==null){
			error=<h4 style={{color:"red"}}>{this.state.error}</h4>;
		}
		const chapterOptions=this.state.chapters.map((chapter)=>{
			return <option key={chapter.key} value={chapter.key}>{chapter.title}</option>
		});
		return <>
			<h3>Management</h3>
			Password <input type="password" value={this.state.password} onChange={this.changePassword} />
			<h3>Create Chapter</h3>
			<form onSubmit={this.createChapter}>
				Key <input type="text" data-field="key" value={this.state.createChapter.key} onChange={this.changeCreateChapterInput} /><br/>
				Title <input type="text" data-field="title" value={this.state.createChapter.title} onChange={this.changeCreateChapterInput} /><br/>
				Description <input type="text" data-field="description" value={this.state.createChapter.description} onChange={this.changeCreateChapterInput} /><br/>
				<button>Create</button>
			</form>
			<h3>Create Story</h3>
			<form onSubmit={this.createStory}>
				Chapter <select data-field="chapter" value={this.state.createStory.chapter} onChange={this.changeCreateStoryInput}>
					<option key="" value="">None</option>
					{chapterOptions}
				</select><br/>
				Tags <input type="text" data-field="tags" value={this.state.createStory.tags} onChange={this.changeCreateStoryInput} /><br/>
				Key <input type="text" data-field="key" value={this.state.createStory.key} onChange={this.changeCreateStoryInput} /><br/>
				Title <input type="text" data-field="title" value={this.state.createStory.title} onChange={this.changeCreateStoryInput} /><br/>
				Abstract <textarea data-field="abstract" value={this.state.createStory.abstract} onChange={this.changeCreateStoryInput}></textarea><br/>
				Content <textarea data-field="content" value={this.state.createStory.content} onChange={this.changeCreateStoryInput}></textarea><br/>
				<button>Create</button>
			</form>
			{error}
		</>;
	}
}
ReactDOM.render(<App/>, document.querySelector("#root"));