
var App=function(key=0){
	var that = {
		enviro: flock.init(),
		synth:flock.synth({
			synthDef:{
					id: "player",
					ugen: "flock.ugen.playBuffer",
					buffer: {
						id: "toPlay",                    // The sound file will be loaded into an environment buffer named "toPlay."
						url:"sounds/zap.wav",
					},
					speed: 1.0,
					loop: 1.0
				},
				
		})
	};
	
	that.init=function(key=0){
		that.key = key;
	};
	
	that.togglePlayback = function(b=false){
		if (that.enviro.model.isPlaying) {
			that.enviro.stop();
		} else {
			that.enviro.play();
			}
		};
	that.init();
	return that;
}
var keyDead = false; //Is key being listened to.
var myApp=App();
$(function(){

	var waitABit = function(){
		keyDead=false;
		myApp.togglePlayback();
	};
	
	$("#mainPage").keydown( function(event){
		if(!keyDead)
		{
			if(event.which ==38){ //UpArrow.
				myApp.togglePlayback();
				keyDead= true;
				setTimeout(function(){
					waitABit();
				}, 1000); //We wait several whole seconds for the person to disconnect the key, otherwise we spam them with good job messages.
			}
		}
	});
	
});