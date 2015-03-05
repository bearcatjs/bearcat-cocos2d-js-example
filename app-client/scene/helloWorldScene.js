/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat cocos2d-js example HelloWorldScene
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var HelloWorldScene = function() {
	this.$id = "helloWorldScene";
	this.$init = "init";
	this.$helloWorldLayer = null;
	this.ctor = null;
}

HelloWorldScene.prototype.init = function() {
	var self = this;
	this.ctor = cc.Scene.extend({
		onEnter: function() {
			this._super();

			self.onEnter(this);
		}
	});
}

HelloWorldScene.prototype.onEnter = function(self) {
	// get helloWorldLayer
	var helloWorldLayer = this.$helloWorldLayer.get();

	// add helloWorldLayer to this scene
	self.addChild(helloWorldLayer);
}

HelloWorldScene.prototype.get = function() {
	return new this.ctor();
}

bearcat.module(HelloWorldScene, typeof module !== 'undefined' ? module : {});