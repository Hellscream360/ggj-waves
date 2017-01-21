import Phaser, { Game } from "phaser";
import store from "./store";

if (undefined === store.phaser) {
	store.phaser = {};
}

export let game = store.phaser.game || null;

export const init = (width = 800,
					 height = 600,
					 renderer = Phaser.AUTO,
					 parent = "",
					 state = null,
					 transparent = false,
					 antialias = true,
					 physicsConfig = null) => {

	game = store.phaser.game = new Game(width, height, renderer, parent, state, transparent, antialias, physicsConfig);

	return game;
};
