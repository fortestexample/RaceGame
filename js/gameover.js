var gameOver = function(game){}

gameOver.prototype = {
	init: function(score){
	
		this.game.add.bitmapText(100, 50, 'desyrel', "Total race time: "+score+" !", 50);
		this.game.add.bitmapText(100, 50, 'desyrel', "Press CROSS to clear scores. Press PLAY to play again", 34);
		
		var storedNames = JSON.parse(localStorage.getItem("scores"));
		if(storedNames!=null)
		{
			storedNames.sort();
			for(var i=0;i<=storedNames.length;i++)
			{
				if(score*1000 < storedNames[i]*1000)
				{
					if((i+1)<=10)
					{
						storedNames.push (score);
					}
					break;
				}
			}
			localStorage.setItem("scores", JSON.stringify(storedNames));
			
			storedNames.sort();
			
			var leaderboard="";
			var toCount;
			if(storedNames.length<=10)
			{
				toCount=storedNames.length;
			}
			else
			{
				toCount=10;
			}
			for(var i=0;i<toCount;i++)
			{
				leaderboard += (i+1)+". "+storedNames[i]+'\n';
			}
			this.game.add.bitmapText(200, 100, 'desyrel', leaderboard, 34);
		}
		else
		{
			var storedNames=new Array();
			storedNames[0] =score;
			localStorage.setItem("scores", JSON.stringify(storedNames));
			
			leaderboard = "1. "+storedNames[0]+'\n';

			this.game.add.bitmapText(200, 100, 'desyrel', leaderboard, 34);
		}
	},
  	create: function(){
		var playButton = this.game.add.button(200,100,"play",this.playTheGame,this);
		playButton.scale.setTo(0.4, 0.4);
		playButton.anchor.setTo(-0.4, -2);
		var delButton = this.game.add.button(100, 450, 'delete', this.resetResults, this, 2, 1, 0);
		delButton.scale.setTo(0.5, 0.5);
	},
	playTheGame: function(){
		startFlag=true;
		this.game.state.start("TheGame");
	},
	resetResults: function()
	{
		localStorage.clear();
	}
}