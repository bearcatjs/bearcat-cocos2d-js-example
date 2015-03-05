/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat cocos2d-js example HelloWorldLayer
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var HelloWorldLayer = function() {
	this.$id = "helloWorldLayer";
	this.$init = "init";
	this.$resourceUtil = null;
	this.ctor = null;
}

HelloWorldLayer.prototype.init = function() {
	var self = this;
	this.ctor = cc.Layer.extend({
		sprite: null,
		helloLabel: null,
		ctor: function() {
			// 1. super init first
			this._super();

			self.addCloseItem(this);

			self.addHelloWorldLabel(this);

			self.addSplashScreen(this);

			self.runAction(this);

			return true;
		}
	});
}

HelloWorldLayer.prototype.addCloseItem = function(self) {
	var res = this.$resourceUtil.getRes();

	// 2. add a menu item with "X" image, which is clicked to quit the program
	// ask the window size
	var size = cc.winSize;

	// add a "close" icon to exit the progress. it's an autorelease object
	var closeItem = new cc.MenuItemImage(
		res.CloseNormal_png,
		res.CloseSelected_png,
		function() {
			cc.log("Menu is clicked!");
		}, self);

	closeItem.attr({
		x: size.width - 20,
		y: 20,
		anchorX: 0.5,
		anchorY: 0.5
	});

	var menu = new cc.Menu(closeItem);
	menu.x = 0;
	menu.y = 0;
	self.addChild(menu, 1);
}

HelloWorldLayer.prototype.addHelloWorldLabel = function(self) {
	// 3. add a label shows "Hello Bearcat"
	// create and initialize a label
	var size = cc.winSize;
	var helloLabel = new cc.LabelTTF("Hello Bearcat", "Arial", 38);
	// position the label on the center of the screen
	helloLabel.x = size.width / 2;
	helloLabel.y = 0;
	// add the label as a child to this layer
	self.helloLabel = helloLabel;
	self.addChild(helloLabel, 5);
}

HelloWorldLayer.prototype.addSplashScreen = function(self) {
	var res = this.$resourceUtil.getRes();

	// add "HelloWorld" splash screen"
	var size = cc.winSize;
	self.sprite = new cc.Sprite(res.HelloWorld_png);
	self.sprite.attr({
		x: size.width / 2,
		y: size.height / 2,
		scale: 0.5,
		rotation: 180
	});
	self.addChild(self.sprite, 0);
}

HelloWorldLayer.prototype.runAction = function(self) {
	var size = cc.winSize;

	self.sprite.runAction(
		cc.sequence(
			cc.rotateTo(2, 0),
			cc.scaleTo(2, 1, 1)
		)
	);

	self.helloLabel.runAction(
		cc.spawn(
			cc.moveBy(2.5, cc.p(0, size.height - 40)),
			cc.tintTo(2.5, 255, 125, 0)
		)
	);
}

HelloWorldLayer.prototype.get = function() {
	return new this.ctor();
}

bearcat.module(HelloWorldLayer, typeof module !== 'undefined' ? module : {});