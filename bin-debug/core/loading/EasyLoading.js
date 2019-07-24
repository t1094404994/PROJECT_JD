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
/**
 * 转圈加载
 */
var EasyLoading = (function (_super) {
    __extends(EasyLoading, _super);
    function EasyLoading() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    EasyLoading.prototype.init = function () {
        this.container = new egret.DisplayObjectContainer();
        this.loadText = new egret.TextField();
        this.loadText.size = 23;
        this.loadText.textColor = 0x000000;
        RES.getResByUrl("resource/assets/P_JiaZai_03.png", function (texture) {
            this.loadImage = new egret.Bitmap();
            this.loadImage.texture = texture;
            this.container.addChild(this.loadImage);
            App.getStageUtils().onCenter(this.container, this.loadImage, true);
            this.hander = App.getFrameManager().creadFrameHander(this.onFrame, this, 1, -1, null, true);
        }, this, RES.ResourceItem.TYPE_IMAGE);
        this.container.addChild(this.loadText);
        this.dispos();
    };
    /**
     * 帧转圈圈
     */
    EasyLoading.prototype.onFrame = function (v) {
        this.loadImage.rotation += 6;
    };
    EasyLoading.prototype.removeFrame = function () {
        App.getFrameManager().removeHander(this.onFrame, this);
    };
    EasyLoading.prototype.loadSource = function (source, callFun) {
        this.callFun = callFun;
        this.show();
        ResUtil.loadGroups(source, this.setProgress, null, this.loadComplete, this);
    };
    EasyLoading.prototype.loadComplete = function (data) {
        this.hide();
        this.callFun();
        this.callFun = null;
    };
    EasyLoading.prototype.dispos = function () {
        this.loadText.text = 0 + "%";
    };
    EasyLoading.prototype.onReSize = function () {
        App.getStageUtils().onCenter(this.container, this.loadText, false);
    };
    /**
     * 设置进度
     */
    EasyLoading.prototype.setProgress = function (groupData) {
        this.loadText.text = String(groupData.getPercent()) + "%";
    };
    /**
     * 显示loading
     */
    EasyLoading.prototype.show = function () {
        this.hander.freezed = false;
        App.getStageUtils().addToStage(this.container, true);
        App.getStageUtils().onCenter(this.container, this.loadText, false);
        this.loadText.addEventListener(egret.Event.RESIZE, this.onReSize, this);
    };
    /**
     * 隐藏loading
     */
    EasyLoading.prototype.hide = function () {
        this.hander.freezed = true;
        this.dispos();
        this.loadText.removeEventListener(egret.Event.RESIZE, this.onReSize, this);
        App.getStageUtils().removeFormStage(this.container);
    };
    return EasyLoading;
}(SingtonClass));
__reflect(EasyLoading.prototype, "EasyLoading", ["ILoadingUI"]);
