
const skills = [
	{
		"name":"HTML 5",
		"level":"90"
	},
	{
		"name":"CSS 3",
		"level":"90"
	},
	{
		"name":"Javascript",
		"level":"50"
	},
	{
		"name":"SQL",
		"level":"50"
	},
	{
		"name":"jQuery",
		"level":"50"
	},
	{
		"name":"Bootstrap",
		"level":"75"
	},
	{
		"name":"PHP",
		"level":"40"
	},
	{
		"name":"Node.JS",
		"level":"40"
	} 

];


var delay = 500;
/* Generate skill graph */
window.onload = function(){
	var skew1 = $("<div>", {class:"skewm backdrop backdrop-blue"});
	var skew2 = $("<div>", {class:"skewp backdrop backdrop-purple"});
	$(".introduction").append(skew1);
	$(".introduction").append(skew2);
	
	for(let i = 0, key; key = skills[i]; ++i) {
		generateSkill(key.name, key.level);
	}
	
	$("img.render").each(function() {
		$(this).attr("src",$(this).data("src"));
	});
	
	$(document).on("mouseenter mouseleave touchstart", ".wrapper", function() {
		$(this).find("p").toggleClass("transparent");
	});
};



/*load projects as they are scrolled to */
/*actually don't, because that makes things choppy*/
document.addEventListener('scroll', function(event) {
	var curSec = detectCurrentSection();
	if(curSec == 'projects') {
		secProjects();
		unsecSkills();
		unsecContact();
	}
	else if(curSec == 'skills'){
		secSkills();
		unsecProjects();
		unsecContact();		
	}
	else if(curSec == 'contact') {
		unsecSkills();
		unsecProjects();
		secContact();
	}
	
},true);



function secProjects() {
	var windowBottom = $(window).scrollTop() + $(window).height();
	let sec = $(".projects");
	let secTop = sec.offset().top;
	let secHeight = sec.height();
	let pos = ((secTop - windowBottom) * -1);
	let p = (pos / secHeight) * 100;
	if(p < 0 || p > 110) {
		$(".dynamic-backdrop").removeClass("dynamic-on");
	} 
	else if(p > 10 && p <= 25) {
		$(".dynamic-skew1").addClass("dynamic-on");
		$(".dynamic-skew2, .dynamic-skew3, .dynamic-skew4").removeClass("dynamic-on");
	}
	else if (p > 25 && p <= 50) {
		$(".dynamic-skew1, .dynamic-skew2").addClass("dynamic-on");
		$(".dynamic-skew3, .dynamic-skew4").removeClass("dynamic-on");
	}
	else if (p > 50 && p <= 75) {
		$(".dynamic-skew1, .dynamic-skew2, .dynamic-skew3").addClass("dynamic-on");
		$(".dynamic-skew4").removeClass("dynamic-on");
		
	} 
	else if (p > 75 && p <= 110) {
		$(".dynamic-backdrop").addClass("dynamic-on");		
	}
}
function secSkills() {
	$(".level").each(function() {
		$(this).css("height",$(this).data("level"));
	});
}
function secContact() {
	$(".skewLinkU").css({"left":0,"right":0});
}
function unsecProjects() {
	$(".dynamic-on").removeClass("dynamic-on");
}
function unsecSkills() {
	$(".level").each(function() {
		$(this).css("height",0);
	});
}
function unsecContact() {
	$(".skewLinkU:odd").css({left:"-100vw", right:"100vw"});
	$(".skewLinkU:even").css({left:"100vw",right:"-100vw"});
}
/*
	Helper function to determine the current section in the vieport;

*/
function detectCurrentSection() {
	var currentID = '';
	var windowHalf = $(window).scrollTop() + ($(window).height() /2);

	$("section").each(function() {
		let sec = $(this);
		let secTop = sec.offset().top;
		let secHeight = sec.height();
		let pos = ((secTop - windowHalf) * -1);
		let p = (pos / secHeight) * 100;
		if(p >= 0 && p <= 100)
			id = $(this).attr('id');
	});
	return id;
} 

function generateSkill(name,level) {
	var $skills = $("ul.skills");
	var $wrapper = $("<div>", {class:"wrapper"});
	var $outer = $("<li>", {class:"outerCircle"});
	var $level = $("<div>", {class:"level"});
	var $inner = $("<div>", {class:"innerCircle"});
	var $p = $("<p>", {class:"no-margin language"});
	var $msg = $("<p>", {class:"no-margin status transparent"});
	$level.appendTo($outer);
	$inner.appendTo($outer)
	$p.appendTo($inner).text(name);
	$level.data("level", level*2);
	$outer.appendTo($wrapper);
	$msg.appendTo($inner).text(getMsg(level));
	$wrapper.appendTo($skills);
}

function getMsg(level){
	switch(true) {
		case (level < 30):
			return "I can fumble my way through it";
		case (level >=30 && level < 40):
			return "I can get by with the right resources";
		case (level >=40 && level < 60):
			return "I'm learning more advanced techniques";
		case (level >= 60 && level < 80):
			return "I don't need StackOverflow";
		case (level >= 80):
			return "I know my stuff";
	}
}

function retry(img) {
	img.onerror = "";
	$this = $(img);
	console.log("retrying download of an image");
	$this.attr("src",$this.data("src"));
}


