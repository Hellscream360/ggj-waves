import {game} from "../setup";
import store from "../store";

export const groundBuilder = () => {
	const state = store.state;
	const platforms = state.platforms = game.add.group();
	const slopes = state.slopes = game.add.group();
	let ground;

	//  We will enable physics for any object that is created in this group
	platforms.enableBody = true;
	slopes.enableBody = true;

	for (let i = 0, j = 0; i < 100; i++) {
		// Here we create the ground.
		if (1 <= i && 3 >= i) {
			ground = slopes.create(i * 64, game.world.height - 64 * 4 - j * 64, "sprites", "tileBrown_11.png");
			--j;
		} else {
			ground = platforms.create(i * 64, game.world.height - 64 * 4 - j * 64, "sprites", "tileBrown_02.png");
		}

		//  This stops it from falling away when you jump on it
		ground.body.immovable = true;
	}
};

