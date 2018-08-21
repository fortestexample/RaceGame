var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });
var emitter;
var emitter2;

function preload() {
	game.load.crossOrigin = "Anonymous";
	game.forceSingleUpdate = true;
    //game.load.tilemap('map', 'assets/races/race.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tilemap('map', 'assets/races/race2.json', null, Phaser.Tilemap.TILED_JSON);
	
    /*game.load.image('spritesheet_objects', 'assets/races/spritesheet_objects.png');
	game.load.image('spritesheet_tiles', 'assets/races/spritesheet_tiles.png');*/
	game.load.image('123', 'assets/races/123.png');
	game.load.image('1111', 'assets/races/1111.png');
	
	game.load.image('earth', 'assets/races/1111.png');
	
	game.load.image('car', 'assets/races/car_green_small_5.png');
	game.load.image('carEnemy', 'assets/races/car_black_small_4.png');
	
	game.load.image('1', 'assets/races/yellow.png');
	game.load.image('2', 'assets/races/blue.png');
	game.load.image('3', 'assets/races/white.png');
	
	game.load.audio('boden', ['assets/audio/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg']);
}
var map;
var layer;
var layerGround;
var land;

var resulScreen;

var sprite;
var spriteEnemy;
var cursors;
var startFlag=false;
var finishFlag=false;

var timeString;
var timeText;

var totalRaceTime;

var timer;

var scores = [];

var s;
var music;
var fx;

function create() {
	land = game.add.tileSprite(0, 0, 800, 600, 'earth');
    land.fixedToCamera = true;
	
	music = game.add.audio('boden');
	this.instructions = this.add.text( 510,589, 'Use Arrow Keys to Move', {font: '20px monospace', fill: '#fff', align: 'center'});
	this.instructions.anchor.setTo(0.5, 0.5);
	this.time.events.add(9000, this.instructions.destroy, this.instructions);
	
    game.physics.startSystem(Phaser.Physics.ARCADE);

    map = game.add.tilemap('map');

    map.addTilesetImage('1111');
	map.addTilesetImage('123');

    layer = map.createLayer('Tile Layer 1');
	
	map.setCollision(91,true);

	map.setTileIndexCallback(42, hitStart, this);
	map.setTileIndexCallback(69, hitFinish, this);

    layer.resizeWorld();

    sprite = game.add.sprite(62, 960, 'car');
    sprite.anchor.set(0.5);
    game.physics.enable(sprite);
	sprite.body.collideWorldBounds=true;
    sprite.body.maxAngular = 500;
    sprite.body.angularDrag = 50;
	
	spriteEnemy = game.add.sprite(190, 960, 'carEnemy');
    spriteEnemy.anchor.set(0.5);
    game.physics.enable(spriteEnemy);
	spriteEnemy.body.collideWorldBounds=true;
    spriteEnemy.body.maxAngular = 500;
    spriteEnemy.body.angularDrag = 50;

    game.camera.follow(sprite);

    cursors = game.input.keyboard.createCursorKeys();
}

function hitStart(sprite, tile) {
	if(startFlag==false)
	{
		music.play();
		startTime = this.time.now;
		
		startFlag=true;
		
		timer=this.time.create();
		timer.start();
				
		this.timerText = this.add.text(this.world.centerX, this.world.centerY, "");
	}
    return false;
}

function restartGame()
{
	startFlag=false;
	finishFlag=false;
	game.state.start(game.state.current);
}
function resetResults()
{
	localStorage.clear();
}

function hitFinish(sprite, tile) {
	timer.stop();
	game.sound.stopAll();
	
	var storedNames=new Array();
	var resultString;
	var placeBadge="";
	var placeForEmitter;
	var inserted=false;
	
	if(finishFlag==false)
	{
		storedNames = JSON.parse(localStorage.getItem("scores"));
		if(storedNames!=null)
		{
			storedNames.sort();
			for(var i=0;i<=storedNames.length;i++)
			{
				if(totalRaceTime*1000 < storedNames[i]*1000)
				{
					resultString="Your place is - "+(i+1);
					if((i+1)<=10)
					{
						storedNames.push (totalRaceTime);
						inserted=true;
						if((i+1)>=1 && (i+1)<=3)
						{
							placeBadge=(i+1)+"place.jpg";
							placeForEmitter=(i+1);
						}
						else
						{
							placeBadge="any.jpg";
						}
					}
					else
					{
						placeBadge="any.jpg";
						resultString+=" <br> TRY AGAIN TO BEAT THE RECORD!";
					}
					break;
				}
			}
			if(inserted==false)
			{
				storedNames.push (totalRaceTime);
				inserted=true;
				resultString="Your place is - "+storedNames.length;
					if(storedNames.length<=10)
					{
						if(storedNames.length>=1 && storedNames.length<=3)
						{
							placeBadge=storedNames.length+"place.jpg";
							placeForEmitter=storedNames.length;
						}
						else
						{
							placeBadge="any.jpg";
						}
					}
					else
					{
						placeBadge="any.jpg";
						resultString+=" <br> TRY AGAIN TO BEAT THE RECORD!";
					}
			}
			localStorage.setItem("scores", JSON.stringify(storedNames));
			
			finishFlag=true;
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
				leaderboard += (i+1)+". "+storedNames[i]+"<br>";
			}
		}
		else
		{
			var storedNames=new Array();
			storedNames[0] =totalRaceTime;
			resultString="Your place is - 1";
			placeBadge="1place.jpg";
			placeForEmitter=1;
			localStorage.setItem("scores", JSON.stringify(storedNames));
			
			finishFlag=true;
			storedNames.sort();
			
			var leaderboard="";
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
				leaderboard += (i+1)+". "+storedNames[i]+"<br>";
			}
		}
		
		emitter = game.add.emitter(game.world.centerX+700, 900, 200);
		emitter.makeParticles(placeForEmitter);
		emitter.setRotation(0, 0);
		emitter.setAlpha(0.7, 1);
		emitter.setScale(0.7, 1);
		emitter.gravity = -400;
		emitter.start(false, 5000, 100);
		
		emitter2 = game.add.emitter(game.world.centerX+1240, 900, 200);
		emitter2.makeParticles(placeForEmitter);
		emitter2.setRotation(0, 0);
		emitter2.setAlpha(0.7, 1);
		emitter2.setScale(0.7, 1);
		emitter2.gravity = -400;
		emitter2.start(false, 5000, 100);
		
		document.getElementById("placeBadge").src = "assets/races/"+placeBadge;
		document.getElementById('scoreboard').innerHTML = "Total time: "+totalRaceTime+"<br>"+resultString+"<br><br>"+leaderboard;
		$("#myModal").modal();
	}
	
    return false;
}

function update() {
	game.physics.arcade.collide(spriteEnemy, layer);
    game.physics.arcade.collide(sprite, layer);

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
        game.physics.arcade.velocityFromAngle(sprite.angle-90, 400, sprite.body.velocity);
    }
	
	if(timer!=undefined && finishFlag==false)
	{
		//this.timerText.text = timer.seconds.toFixed(3);
		game.debug.text('Elapsed seconds: ' + timer.seconds.toFixed(3), 32, 32);
		totalRaceTime=timer.seconds.toFixed(3);
	}
}

function render() {

    //game.debug.body(sprite);
		/*console.log('X:' + this.input.activePointer.x);
		console.log('Y:' + this.input.activePointer.y);*/
}