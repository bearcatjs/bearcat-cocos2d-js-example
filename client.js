/*!
 * .______    _______     ___      .______       ______     ___   .__________.
 * (   _  )  (   ____)   /   \     (   _  )     (      )   /   \  (          )
 * |  |_)  ) |  |__     /  ^  \    |  |_)  )   |  ,----'  /  ^  \ `---|  |---`
 * |   _  <  |   __)   /  /_\  \   |      )    |  |      /  /_\  \    |  |
 * |  |_)  ) |  |____ /  _____  \  |  |)  ----.|  `----./  _____  \   |  |
 * (______)  (_______/__/     \__\ ( _| `.____) (______)__/     \__\  |__|
 *
 * Bearcat cocos2d-js example app
 * Copyright(c) 2015 fantasyni <fantasyni@163.com>
 * MIT Licensed
 */

require('./bearcat-bootstrap.js');
var bearcat = require('bearcat');
window.bearcat = bearcat;

cc.game.onStart = function() {
    cc.view.adjustViewPort(true);
    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
    var self = this;
    //load resources
    bearcat.createApp();
    bearcat.use(['helloWorldScene']);
    bearcat.start(function() {
        var resourceUtil = bearcat.getBean('resourceUtil');
        var g_resources = resourceUtil.getResources();
        cc.LoaderScene.preload(g_resources, function() {
            var helloWorldScene = bearcat.getBean('helloWorldScene');
            cc.director.runScene(helloWorldScene.get());
        }, self);
    });

};

cc.game.run();