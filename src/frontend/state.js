import {Loader, Physics} from "phaser";
import {game} from "./setup";
import store from "./store";

const preload = () => {
	store.state = {};

	game.load.atlas(
		'dude',
		'assets/images/sprites/spritesheet_complete.png',
		'assets/images/sprites/spritesheet_complete.xml',
		null,
		Loader.TEXTURE_ATLAS_XML_STARLING
	);

};

const create = () => {
	const state = store.state;

};

const update = () => {

};

export default {
	preload: preload,
	create: create,
	update: update,
}
