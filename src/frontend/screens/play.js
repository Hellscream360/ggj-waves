import me from "melon";

export default  me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function () {
		const jsonLevel = me.loader.getJSON("area01_json");

		const level = new me.TMXTileMap("area01", jsonLevel);
		level.addTo(me.game.world);

		//me.levelDirector.loadLevel("area01");

		console.log(me.levelDirector.levelCount()); // debug
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function () {
	}
});
