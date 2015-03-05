/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat cocos2d-js example ResourceUtil
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

var ResourceUtil = function() {
	this.$id = "resourceUtil";
	this.$init = "init";
	this.g_resources = [];
	this.res = {};
}

ResourceUtil.prototype.init = function() {
	var res = {
		HelloWorld_png: "res/HelloWorld.png",
		CloseNormal_png: "res/CloseNormal.png",
		CloseSelected_png: "res/CloseSelected.png"
	};

	this.res = res;

	var g_resources = [];
	for (var i in res) {
		g_resources.push(res[i]);
	}

	this.g_resources = g_resources;
}

ResourceUtil.prototype.getResources = function() {
	return this.g_resources;
}

ResourceUtil.prototype.getRes = function() {
	return this.res;
}

bearcat.module(ResourceUtil, typeof module !== 'undefined' ? module : {});