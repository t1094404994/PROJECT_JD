var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 游戏场景类
 */
var BaseSence = (function (_super) {
    __extends(BaseSence, _super);
    function BaseSence() {
        var _this = _super.call(this) || this;
        _this._srouce = null;
        _this._layers = new Array();
        _this._isInit = false;
        return _this;
    }
    /**
     * 进入场景调用
     */
    BaseSence.prototype.onEnter = function () {
    };
    BaseSence.prototype.setSource = function (source) {
        this._srouce = source;
    };
    /**
     * 退出场景调用
     */
    BaseSence.prototype.onExit = function (force) {
        App.getViewManger().closeAll();
        this.removeAllLayer();
        if (force)
            this.destroy();
    };
    /**
     * 销毁场景
     */
    BaseSence.prototype.destroy = function () {
    };
    /**
     * 资源是否加载
     */
    BaseSence.prototype.isInit = function () {
        return this._isInit;
    };
    /**
     * 加载完成
     * @param bool
     */
    BaseSence.prototype.setInit = function (bool) {
        this._isInit = bool;
    };
    /**
     * 添加一个Layer到场景
     * @param layer
     */
    BaseSence.prototype.addLayer = function (layer, index) {
        this.addChild(layer);
        this._layers.push(layer);
    };
    /**
     * 在舞台移除一个Layer
     * @param layer
     */
    BaseSence.prototype.removeLayer = function (layer) {
        this.removeChild(layer);
        this._layers.splice(this._layers.indexOf(layer), 1); //TODO 复杂度高
    };
    /**
     * Layer中移除所有
     * @param layer
     */
    BaseSence.prototype.layerRemoveAllChild = function (layer) {
        layer.removeChildren();
    };
    /**
     * 移除所有Layer
     */
    BaseSence.prototype.removeAllLayer = function () {
        while (this._layers.length) {
            var layer = this._layers.pop();
            this.removeChild(layer);
            this.layerRemoveAllChild(layer);
        }
    };
    return BaseSence;
}(egret.DisplayObjectContainer));
__reflect(BaseSence.prototype, "BaseSence");
