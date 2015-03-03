//Tutorial constants. Get them from tutorialConst.*
var tutorialConst = {
	OFF : 0,
	LEARN : 1,
	PRACTICE : 2,
	GAME : 3, 
	//Pages
	PAGE_OFF : "#page_off",
	PAGE_LEARN : "#page_learn",
	PAGE_PRACTICE : "#page_practice",
	PAGE_GAME : "#page_game",
	
};
	

function reload(subPage){
//alert("reloading");
	var toDump = $("#mainContents");
	toDump.children().fadeOut(100); // gets rid of all children nodes of this one.
	$(subPage).fadeIn(100,
	function(){
	$(subPage+">.focused").focus(); 
	});
}
var Tutorial=function(m){ //m is a mode.
	var that = {}; //Make an empty object.
	
	that.init=function(){
		//Initialization 
		that.setMode(m);
		return;
	};
	
	that.setMode = function(mode){ //setter
		switch(mode) { //set the page to the correct page.
			case tutorialConst.OFF:
				reload(tutorialConst.PAGE_OFF);
				break;
			case tutorialConst.LEARN:
				reload(tutorialConst.PAGE_LEARN);
				break;
			case tutorialConst.PRACTICE:
				reload(tutorialConst.PAGE_PRACTICE);
				break;
			case tutorialConst.GAME:
				reload(tutorialConst.PAGE_GAME);
				break;
			default:
				console.log("invalid.");
				return;
		};
		that.mode=mode;
	}
	
	that.getMode = function(){ //getter
		return that.mode;
	}
	
	that.init();
	return that;
};


var tutorial;
var makeyMakey={
	LEARN: {
		32 : "space",
		37 : "left arrow",
		38:"up arrow",
		39 : "right arrow",
		40 : "down arrow"
	},
	keyDead : false
};
$(function(){
	tutorial=Tutorial(tutorialConst.OFF);
	makeyMakey.items=[]; //only show modals once per item.
	makeyMakey.showModal=function(modal){ 
		$(modal).modal({});
		$(modal).on('hidden.bs.modal', makeyMakey.closeModal)
	}
	makeyMakey.closeModal = function(e){
		var visibleH1=$("h1:visible");
		$("p.focused:visible").remove(); //Get rid of the focused fake element, and set it to the visible h1.
		visibleH1.focus();
		visibleH1.attr("class","focused");
	};
	$(".rkp").keydown( function(event){
		if(!makeyMakey.keyDead)
		{
			makeyMakey.keyDead= true;
			switch(tutorial.getMode())
			{
				case tutorialConst.LEARN:
					var area=$("#learn_area");
					area.text(makeyMakey.LEARN[event.which]);
					break;
			}
		}
	});
	
	$(".rkp").keyup(function(evt){
		makeyMakey.keyDead = false;
	});
	
});