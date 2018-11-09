var theGame = function(game){
	map=null;
	layer=null;
	layerGround=null;
	land=null;

	sprite=null;
	cursors=null;
	startFlag=false;
	finishFlag=false;

	timeString="";
	timeText="";

	totalRaceTime="";

	timer=null;

	s=null;
	music=null;
	fx=null;
}

theGame.prototype = {
  	create: function(){
		land = this.game.add.tileSprite(0, 0, 800, 600, 'earth');
		land.fixedToCamera = true;
		
		music = this.game.add.audio('boden');
		this.instructions = this.add.text( 510,589, 'Use Arrow Keys to Move', {font: '20px monospace', fill: '#fff', align: 'center'});
		this.instructions.anchor.setTo(0.5, 0.5);
		this.time.events.add(9000, this.instructions.destroy, this.instructions);
		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		map = this.game.add.tilemap('map');

		map.addTilesetImage('1111');
		map.addTilesetImage('123');

		layer = map.createLayer('Tile Layer 1');
		
		map.setCollision(91,true);

		map.setTileIndexCallback(42, this.hitStart, this);
		map.setTileIndexCallback(69, this.hitFinish, this);

		layer.resizeWorld();

		sprite = this.game.add.sprite(62, 960, 'car');
		sprite.anchor.set(0.5);
		this.game.physics.enable(sprite);
		sprite.body.collideWorldBounds=true;
		sprite.body.maxAngular = 500;
		sprite.body.angularDrag = 50;

		this.game.camera.follow(sprite);

		cursors = this.game.input.keyboard.createCursorKeys();
	},
	hitStart: function(sprite, tile){
		music.play();
		startTime = this.time.now;
		
		startFlag=true;
		
		timer=this.time.create();
		timer.start();
				
		this.timerText = this.add.text(this.world.centerX, this.world.centerY, "");
	},
	hitFinish:function(sprite, tile){
		timer.stop();
		this.game.sound.stopAll();
		this.game.state.start("GameOver",true,false,totalRaceTime);
	},
	update: function() {
    this.game.physics.arcade.collide(sprite, layer);

    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    sprite.body.angularVelocity = 0;

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 200;
    }

    if (cursors.up.isDown)
    {
        this.game.physics.arcade.velocityFromAngle(sprite.angle-90, 400, sprite.body.velocity);
    }
	
	if(timer!=undefined && finishFlag==false)
	{
		this.game.debug.text('Elapsed seconds: ' + timer.seconds.toFixed(3), 32, 32);
		totalRaceTime=timer.seconds.toFixed(3);
	}
}
}