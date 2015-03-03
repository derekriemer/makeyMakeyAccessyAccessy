
var keyDead = false; //Is key being listened to.

$(function(){

	var waitABit = function(){
		keyDead=false;
	};
	
	$("input").keydown( function(event){
		
		if(!keyDead)
		{
			$("#wichKey").html(event.which+"");
			keyDead= true;
			setTimeout(function(){
				waitABit();
			}, 200); //We wait several whole seconds for the person to disconnect the key, otherwise we spam them with good job messages.
		}
		
	});
    

});