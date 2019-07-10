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
            this.loadImage.x = this.loadImage.anchorOffsetX = this.loadImage.width / 2;
            this.loadImage.x = this.loadImage.anchorOffsetY = this.loadImage.height / 2;
            this.container.addChild(this.loadImage);
            App.getFrameManager().creadFrameHander(this.onFrame, this, 1, -1);
        }, this, RES.ResourceItem.TYPE_IMAGE);
        this.container.addChild(this.loadText);
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
    /**
     * 设置进度
     */
    EasyLoading.prototype.setProgress = function (groupData) {
        App.getEasyLoading().loadText.text = String(groupData.getPercent()) + "%";
    };
    /**
     * 显示loading
     */
    EasyLoading.prototype.show = function () {
        App.getStageUtils().addToStage(this.container, true);
    };
    /**
     * 隐藏loading
     */
    EasyLoading.prototype.hide = function () {
        App.getStageUtils().removeFormStage(this.container);
    };
    return EasyLoading;
}(SingtonClass));
__reflect(EasyLoading.prototype, "EasyLoading", ["ILoadingUI"]);
