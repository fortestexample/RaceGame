var boot = function(game){
	console.log("%cStarting my game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function(){
          this.game.load.image("loading","assets/races/loading.gif"); 
	},
  	create: function(){
		this.game.state.start("Preload");
	}
}