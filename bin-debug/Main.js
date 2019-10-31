//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.loadResConfig();
        return _this;
        //this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onStage,this);
    }
    /**
     * 加载进度界面
     * loading process interface
     */
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
    };
    Main.prototype.loadResConfig = function () {
        //初始化Resource资源加载库
        RES.loadConfig("resource/default.res.json", "resource/");
        RES.loadGroup("preload", 0);
        this.onConfigComplete();
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    Main.prototype.onConfigComplete = function () {
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    /**
     * 主题文件加载完成
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.onStage();
    };
    /**初始化*/
    Main.prototype.onStage = function () {
        App.getStageUtils().initwh();
        App.getSenceManger().register(SenceConst.LOGIN, new LoginSence());
        App.getSenceManger().openSence(SenceConst.LOGIN);
        //this.createGameScene();
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var img = new egret.Bitmap();
        img = this.createBitmapByName("bg_jpg");
        img.width = this.stage.stageWidth;
        img.height = this.stage.stageHeight;
        this.addChild(img);
        this.CreateWorld();
        this.CreatePlane();
        RES.loadGroup("testtttt");
        this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonClick, this);
    };
    Main.prototype.CreateWorld = function () {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.gravity = [0, 10];
    };
    Main.prototype.CreatePlane = function () {
        var planeShape = new p2.Plane();
        this.planeBody = new p2.Body({
            type: p2.Body.wSTATIC,
            position: [0, this.stage.stageHeight],
        });
        this.planeBody.angle = Math.PI;
        this.planeBody.displays = [];
        this.planeBody.addShape(planeShape);
        this.world.addBody(this.planeBody);
    };
    Main.prototype.onButtonClick = function (e) {
        if (Math.random() > 0.5) {
            //添加方形刚体 
            var boxShape = new p2.Box({ width: 140, height: 80 });
            this.shpeBody = new p2.Body({ mass: 1, position: [e.stageX, e.stageY], angularVelocity: 1 });
            this.shpeBody.addShape(boxShape);
            this.world.addBody(this.shpeBody);
            this.display = this.createBitmapByName("loading_png");
            this.display.width = boxShape.width;
            this.display.height = boxShape.height;
            console.log(e.stageX, e.stageY);
        }
        else {
            //添加圆形刚体
            var circleShape = new p2.Circle({ radius: 60 });
            this.shpeBody = new p2.Body({ mass: 1, position: [e.stageX, e.stageY] });
            this.shpeBody.addShape(circleShape);
            this.world.addBody(this.shpeBody);
            this.display = this.createBitmapByName("loading_png");
            this.display.width = circleShape.radius * 2;
            this.display.height = circleShape.radius * 2;
        }
        this.display.anchorOffsetX = this.display.width / 2;
        this.display.anchorOffsetY = this.display.height / 2;
        this.display.x = -100;
        this.display.y = -100;
        this.display.rotation = 270;
        this.shpeBody.displays = [this.display];
        this.addChild(this.display);
    };
    //帧事件，步函数
    Main.prototype.update = function () {
        this.world.step(1);
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var boxBody = this.world.bodies[i];
            var box = boxBody.displays[0];
            if (box) {
                box.x = boxBody.position[0];
                box.y = boxBody.position[1];
                //这里刷新图片旋转
                box.rotation = boxBody.angle * 180 / Math.PI;
                if (boxBody.sleepState == p2.Body.SLEEPING) {
                    box.alpha = 0.5;
                }
                else {
                    box.alpha = 1;
                }
            }
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
