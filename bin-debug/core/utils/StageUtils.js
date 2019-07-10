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
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        var _this = _super.call(this) || this;
        _this.stage = egret.MainContext.instance.stage;
        return _this;
    }
    /**
     * 获取舞台的高度
     */
    StageUtils.prototype.getHeight = function () {
        return this.stage.stageHeight;
    };
    /**
     * 获取游戏宽度
     */
    StageUtils.prototype.getWidth = function () {
        return this.stage.stageWidth;
    };
    /**
     * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
     * @param value
     */
    StageUtils.prototype.setTouchChildren = function (value) {
        this.stage.touchChildren = value;
    };
    /**
     * 设置同时可触发几个点击事件
     * @param value
     */
    StageUtils.prototype.setMaxTouches = function (value) {
        this.stage.maxTouches = value;
    };
    /**
     * 设置适配方式
     * @param value
     */
    StageUtils.prototype.setScaleMode = function (value) {
        this.stage.scaleMode = value;
    };
    /**
     * 开启屏幕自适应
     */
    StageUtils.prototype.openUIResize = function () {
        this.stage.addEventListener(egret.Event.RESIZE, this.onUIResize, this);
        this.onUIResize();
    };
    StageUtils.prototype.onUIResize = function () {
        this.setResolutionRate();
    };
    /**
     * 屏幕尺寸改变调用,自适应
     */
    StageUtils.prototype.setResolutionRate = function () {
        this.stage.orientation = egret.OrientationMode.AUTO;
        if (this.stage.stageHeight * 16 >= this.stage.stageWidth * 9) {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH; //所以宽度不变
        }
        else {
            this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        }
    };
    /**
     * 将显示对象添加到舞台上
     * @param view
     */
    StageUtils.prototype.addToStage = function (view, center, index) {
        this.stage.addChild(view);
        if (center) {
            view.x = Math.floor(this.stage.width / 2 - view.width / 2);
            view.y = Math.floor(this.stage.height / 2 - view.height / 2);
        }
    };
    /**
     * 将显示对象移除舞台
     * @param view
     */
    StageUtils.prototype.removeFormStage = function (view) {
        this.stage.removeChild(view);
    };
    StageUtils.prototype.initwh = function () {
        this.stage.width = 900;
        this.stage.height = 1600;
    };
    return StageUtils;
}(SingtonClass));
__reflect(StageUtils.prototype, "StageUtils");
