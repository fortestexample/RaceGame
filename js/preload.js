var preload = function(game){}

preload.prototype = {
	preload: function(){ 
        var loadingBar = this.add.sprite(160,240,"loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);
		
		this.game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
		
		this.game.load.crossOrigin = "Anonymous";
		this.game.forceSingleUpdate = true;

		this.game.load.tilemap('map', 'assets/races/race2.json', null, Phaser.Tilemap.TILED_JSON);
		
		this.game.load.image('123', 'assets/races/123.png');
		this.game.load.image('1111', 'assets/races/1111.png');
		
		this.game.load.image('play', 'assets/races/Play.png');
		this.game.load.image('delete', 'assets/races/delete.jpg');
		
		this.game.load.image('earth', 'assets/races/1111.png');
		
		this.game.load.image('car', 'assets/races/car_green_small_5.png');
		
		this.game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
	},
  	create: function(){
		this.game.state.start("GameTitle");
	}
}