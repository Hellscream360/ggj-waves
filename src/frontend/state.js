import { Physics } from "phaser";
import { game } from "./setup";
import store from "./store";

const preload = () => {
	store.state = {};

	game.load.image('sky', 'assets/images/sprites/sky.png');
	game.load.image('ground', 'assets/images/sprites/platform.png');
	game.load.image('star', 'assets/images/sprites/star.png');
	game.load.spritesheet('dude', 'assets/images/sprites/dude.png', 32, 48);
};

const collectStar = (player, star) => {
	const state = store.state;

	// Removes the star from the screen
	star.kill();

	//  Add and update the score
	state.score += 10;
	state.scoreText.text = 'Score: ' + state.score;
};

const create = () => {
	const state = store.state;

	//  We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Physics.ARCADE);

	//  A simple background for our game
	game.add.sprite(0, 0, 'sky');

	//  The platforms group contains the ground and the 2 ledges we can jump on
	state.platforms = game.add.group();

	//  We will enable physics for any object that is created in this group
	state.platforms.enableBody = true;

	// Here we create the ground.
	var ground = state.platforms.create(0, game.world.height - 64, 'ground');

	//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	ground.scale.setTo(2, 2);

	//  This stops it from falling away when you jump on it
	ground.body.immovable = true;

	//  Now let's create two ledges
	var ledge = state.platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;

	ledge = state.platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;

	// The player and its settings
	state.player = game.add.sprite(32, game.world.height - 150, 'dude');

	//  We need to enable physics on the player
	game.physics.arcade.enable(state.player);

	//  Player physics properties. Give the little guy a slight bounce.
	state.player.body.bounce.y = 0.2;
	state.player.body.gravity.y = 300;
	state.player.body.collideWorldBounds = true;

	//  Our two animations, walking left and right.
	state.player.animations.add('left', [0, 1, 2, 3], 10, true);
	state.player.animations.add('right', [5, 6, 7, 8], 10, true);

	//  Finally some stars to collect
	state.stars = game.add.group();

	//  We will enable physics for any star that is created in this group
	state.stars.enableBody = true;

	//  Here we'll create 12 of them evenly spaced apart
	for (var i = 0; i < 12; i++)
	{
		//  Create a star inside of the 'stars' group
		var star = state.stars.create(i * 70, 0, 'star');

		//  Let gravity do its thing
		star.body.gravity.y = 300;

		//  This just gives each star a slightly random bounce value
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	state.score = 0;
	//  The score
	state.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

	//  Our controls.
	state.cursors = game.input.keyboard.createCursorKeys();
};

const update = () => {
	const state = store.state;

	//  Collide the player and the stars with the platforms
	game.physics.arcade.collide(state.player, state.platforms);
	game.physics.arcade.collide(state.stars, state.platforms);

	//  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	game.physics.arcade.overlap(state.player, state.stars, collectStar, null, this);

	//  Reset the players velocity (movement)
	state.player.body.velocity.x = 0;

	if (state.cursors.left.isDown)
	{
		//  Move to the left
		state.player.body.velocity.x = -150;

		state.player.animations.play('left');
	}
	else if (state.cursors.right.isDown)
	{
		//  Move to the right
		state.player.body.velocity.x = 150;

		state.player.animations.play('right');
	}
	else
	{
		//  Stand still
		state.player.animations.stop();

		state.player.frame = 4;
	}

	//  Allow the player to jump if they are touching the ground.
	if (state.cursors.up.isDown && state.player.body.touching.down)
	{
		state.player.body.velocity.y = -350;
	}
};

export default {
	preload: preload,
	create: create,
	update: update,
}
