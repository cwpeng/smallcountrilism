import React from "react";
class HomePage extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return <>
			<h2>小國主義 - Smallcountrilism</h2>
			<div className="description">身在台灣的我們，看起來一點都不偉大。然而，我們始終相信，堅強自信的人民，終究能彼此團結，共同撐起一個令人自豪的國家。</div>
			<section className="imagery">
				<div className="logo">
					<img src="/images/logo.png" />
				</div>
				<div className="text">
					<div>貓與獅影 - 天生具有神秘色彩的動物。身段柔軟，卻不失莊嚴。引人注目，但又有種無法靠近的距離感。</div>
					<div className="facebook">
						<img src="/images/facebook.png" /> 追蹤我們
					</div>
				</div>
			</section>
		</>;
	}
}
export default HomePage;