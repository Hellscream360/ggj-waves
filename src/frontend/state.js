import {Loader, Physics} from "phaser";
import {game} from "./setup";
import store from "./store";
import {groundBuilder} from "./engine";

const preload = () => {
	store.state = {};

	game.load.atlas(
		"sprites",
		"assets/images/sprites/spritesheet_complete.png",
		"assets/images/sprites/spritesheet_complete.xml",
		null,
		Loader.TEXTURE_ATLAS_XML_STARLING
	);
};

const create = () => {
	const state = store.state;

	game.time.advancedTiming = true;
	game.world.setBounds(0, 0, 64 * 100, 600);

	// Input
	state.cursors = game.input.keyboard.createCursorKeys();

	// Enable physics
	game.physics.startSystem(Physics.ARCADE);

	// Build ground
	groundBuilder();

	// Add player
	const player = state.player = game.add.sprite(32, game.world.height - (64 * 4 + 50), "sprites", "playerGreen_up1.png");

	// Enable physics on the player
	game.physics.arcade.enable(player);

	//  Player physics properties
	player.body.collideWorldBounds = false;
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 200;

	// Animations
	const walkSprites = [
		"playerGreen_walk1.png",
		"playerGreen_walk2.png",
		"playerGreen_walk3.png",
		"playerGreen_walk4.png"
	];

	player.animations.add("right", walkSprites, 10, true);

	game.camera.follow(player);
};

const update = () => {
	const state = store.state;
	const cursors = state.cursors;
	const platforms = state.platforms;
	const player = state.player;
	const slopes = state.slopes;

	game.physics.arcade.collide(player, platforms);

	// Reset velocity
	player.body.velocity.x = 200;
	player.animations.play("right");
};

const render = () => {
	game.debug.text(game.time.fps, 2, 14, "#00ff00");
};

export default {
	create: create,
	preload: preload,
	render: render,
	update: update,
}
