import me from "melon";
import resources from "./resources";

export default {
	init: function () {
		me.video.init(640, 480, {
			renderer: me.video.WEBGL,
			wrapper: "app",
		});

		me.loader.onload = this.loader.onLoad;
		me.loader.preload(resources);

		me.state.change(me.state.LOADING);
	},

	loader: {
		onLoad: () => {
			console.log("fuck"); // debug
		}
	}
};
