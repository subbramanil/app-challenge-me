/*
Plain javascript & jQuery
*/

var skills = {
	"languages":["Java","C", "C++"]
};

$(document).ready(function(){
	drawSkill(skills);
});

var drawSkill = function(data){
	console.log("script.drawSkill() entry");
	console.log(JSON.stringify(data));
	console.log(data.languages);

	var canvas = document.getElementById('sample');
	var height = canvas.height;
	var width = canvas.width;
	if(canvas && canvas.getContext){
		var ctx = canvas.getContext("2d");
		if(ctx)	{
			// Start drawing
			ctx.beginPath();
			ctx.arc(height/2,width/2,50,0,Math.PI*2,true);
			ctx.stroke();
		}
	}
	
	console.log("script.drawSkill() exit");
}