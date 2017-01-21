import me from "melon";
import resources from "./resources";
import PlayScreen from "./screens/play";

export default {
	init: function () {
		me.video.init(640, 480, {
			wrapper: "app",
		});

		me.loader.onload = this.loader.onLoad;
		me.loader.preload(resources);

		me.state.change(me.state.LOADING);
	},

	loader: {
		onLoad: () => {
			me.state.set(me.state.PLAY, new PlayScreen());
			me.state.change(me.state.PLAY);
		}
	}
};
