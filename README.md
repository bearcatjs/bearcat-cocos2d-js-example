## bearcat-cocos2d-js-example

[chinese version](http://bearcatjs.org/%E5%8D%9A%E5%AE%A2/bearcat-cocos2djs.html)

## Overview
[cocos2d-js](https://github.com/cocos2d/cocos2d-js) is an open source game engine for web games and native games, it is the HTML5 version of [cocos2d-x](https://github.com/cocos2d/cocos2d-x) includes [cocos2d-html5](https://github.com/cocos2d/cocos2d-html5) and cocos2d-x javaScript binding (JSB). Using Cocos2d-JS, you can write games in JavaScript and run your games on browsers that support HTML5. The API is completely compatible between Cocos2d-html5 and Cocos2d-x JSB. This means that Cocos2d-JS games can be run using Cocos2d's "JavaScript Binding" on Cocos2d-x without or with very little modification.  

However, there are some weaknesses when developing with cocos2d-js, the most principal one is the ***dependency management***  

Cocos2d-js uses ***global namespace*** to manage dependencies and use ***jsList*** configurations to load script files which are quite messy and frustrating, for this concern we can use [bearcat](https://github.com/bearcatjs/bearcat) to resolve javaScript dependency management, [browserify](http://browserify.org/) to require npm modules, [grunt](http://gruntjs.com/) to handle development workflow   

## Startup

### Create cocos2d-js projects

```
cocos new -l js bearcat_cocos2d_js_example
```  

```
cd bearcat_cocos2d_js_example/
cocos run -p web
```

now you can see helloworld from your browser  

### Setup development envrionment

then we modify this project to make it more sweet  

* create source directory for client codes   

```
mkdir app-client
```

for fullstack development concern, we can create source directories for shared codes and server codes  

```
mkdir app-shared
mkdir app-server
```

* add package.json  

package.json  
```
{
  "name": "bearcat-cocos2d-js-example",
  "version": "0.0.1",
  "dependencies": {
    "bearcat": "0.4.x"
  },
  "devDependencies": {
    "grunt": "~0.4.2",
    "grunt-contrib-clean": "0.5.x",
    "grunt-bearcat-browser": "0.x",
    "grunt-browserify": "3.2.x"
  }
}
```

* add gruntfile.js  

gruntfile.js  
```
'use strict';
  
module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bearcat-browser');
  
  var src = [];
  
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      "coverage.html": {
        src: ['coverage.html']
      }
    },
    bearcat_browser: {
      default: {
        dest: "bearcat-bootstrap.js",
        context: "client-context.json"
      }
    },
    // browserify everything
    browserify: {
      standalone: {
        src: ['client.js'],
        dest: 'main.js',
        options: {

        }
      }
    }
  });
  
  // Default task.
  grunt.registerTask('default', ['clean', 'bearcat_browser', 'browserify']);
};
```

* add client.js as the client main script  

client.js  
```
require('./bearcat-bootstrap.js');
var bearcat = require('bearcat');
window.bearcat = bearcat; // using browserify to resolve npm modules
  
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
```

* add client-context.json to manage codes to run for cocos2d-js  

client-context.json  
```
{
    "name": "bearcat-cocos2d-js-example",
    "description": "client context.json",
    "scan": ["app-client", "app-shared"],
    "beans": []
}
```

as we can see, we scan ***app-client***, and ***app-shared*** for client codes   

* modify project.json, simply set the jsList to an empty array, for now we use bearcat and browserify  

project.json  
```
{
    "project_type": "javascript",
  
    "debugMode": 1,
    "showFPS": true,
    "frameRate": 60,
    "id": "gameCanvas",
    "renderMode": 0,
    "engineDir": "frameworks/cocos2d-html5",
  
    "modules": ["cocos2d"],
  
    "jsList": []
}
```

* install npm dependencies  
```
npm install
```

then you can use grunt workflow to generate ***bearcat-bootstrap.js***, ***main.js***  

```
grunt
```

since now, we have setted up the development envrionment with bearcat and browserify

### Coding with bearcat

#### Add helloWorldLayer  

```
var HelloWorldLayer = function() {
    this.$id = "helloWorldLayer";
    this.$init = "init";
    this.ctor = null;
}
  
HelloWorldLayer.prototype.init = function() {
    var self = this;
    this.ctor = cc.Layer.extend({
      sprite: null,
      helloLabel: null,
      ctor: function() {
      }
    });
}
  
HelloWorldLayer.prototype.get = function() {
  return new this.ctor();
}
  
bearcat.module(HelloWorldLayer, typeof module !== 'undefined' ? module : {});
```

as you can see, HelloWorldLayer is actually a factory bean for creating ***helloWorldLayer***  
when get this helloWorldLayer bean, we simply call the ***get*** method to fetch the ***helloWorldLayer***  

```
var HelloWorldLayer = bearcat.getBean('helloWorldLayer');
var helloWorldLayer = HelloWorldLayer.get(); // fetch the layer instance
```

#### Add dependency

with this factory bean, we can resolve dependencies with [bearcat dependency injection](http://bearcatjs.org/guide/dependency-injection.html)  

for example, we can resolve ***resourceUtil*** as its dependency to resolve asserts resources   

```
var HelloWorldLayer = function() {
    this.$id = "helloWorldLayer";
    this.$init = "init";
    this.$resourceUtil = null;
    this.ctor = null;
}
```

[resourceUtil.js](https://github.com/bearcatjs/bearcat-cocos2d-js-example/blob/master/app-client/util/resourceUtil.js)  

#### Implement layer logic

```
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
```

we can refactor the logic into stateless ***HelloWorldLayer*** factory bean prototype methods  

* call this._super();
* addCloseItem with this as its argument
* addHelloWorldLabel
* addSplashScreen
* runAction

#### Implement concrete layer logic

we can now use argument ***self*** to refer to ctor method's ***this***  
use ***this*** to get dependency for example ***this.$resourceUtil***  
since this method is stateless, we can easily hot wrap it when needed  

```
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
```

the whole example can be found on [bearcat-coscos2d-js-example](https://github.com/bearcatjs/bearcat-cocos2d-js-example)  

### Deploy and run
for web, it is deadly simple  

```
cocos run -p web
```

for android

you should modify ***build-cfg.json*** file in ***frameworks/runtime-src/proj.android/build-cfg.json***  

```
{
    "ndk_module_path": [
        "../../js-bindings",
        "../../js-bindings/cocos2d-x",
        "../../js-bindings/cocos2d-x/cocos",
        "../../js-bindings/cocos2d-x/external"
    ],
    "copy_resources": [{
        "from": "../../../app-client",
        "to": "app-client"
    }, {
        "from": "../../../app-shared",
        "to": "app-shared"
    }, {
        "from": "../../../res",
        "to": "res"
    }, {
        "from": "../../../main.js",
        "to": ""
    }, {
        "from": "../../../project.json",
        "to": ""
    }, {
        "from": "../../js-bindings/bindings/script",
        "to": "script"
    }]
}
```

as we can see, we remove copying the ***src*** directory, and add ***app-client***, ***app-shared*** directories to be packed into android apk  

then we can simply run 
```
cocos run -p android
```

that's it  