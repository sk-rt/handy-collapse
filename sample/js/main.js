
import HandyCollapse from "../../src/index.js";

document.addEventListener("DOMContentLoaded", () => {
	//Basic sample
	let basic = new HandyCollapse({
		nameSpace: "basic",
		closeOthers: true
	});
	//Nested 
	let nested = new HandyCollapse({
		nameSpace: "nested",
		closeOthers: false
	});
	//Callback 
	let callback = new HandyCollapse({
		nameSpace: "callback",
		closeOthers: false,
		onSlideStart: (isOpen,contentID) =>{
			console.log(isOpen);
			let buttonEl = document.querySelector(`[data-callback-control='${contentID}']`);
			if(!buttonEl) return;
			if(isOpen){
				buttonEl.textContent = "Opned " + contentID;
			} else {
				buttonEl.textContent = "Closed " + contentID;
			}
		},
	});
},false)