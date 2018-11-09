var gameTitle = function(game){}
 
gameTitle.prototype = {
  	create: function(){
		var playButton = this.game.add.button(160,320,"play",this.playTheGame,this);
		playButton.anchor.setTo(0,0.5);
	},
	playTheGame: function(){
		this.game.state.start("TheGame");
	}
}