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
 * 游戏场景管理类
 */
var SenceManager = (function (_super) {
    __extends(SenceManager, _super);
    function SenceManager() {
        var _this = _super.call(this) || this;
        _this.sences = {};
        return _this;
    }
    /**
     * 注册场景
     * @param key 场景标识
     * @param sence 场景
     */
    SenceManager.prototype.register = function (key, sence) {
        this.sences[key] = sence;
    };
    /**
     * 解除注册场景
     * @param key 标识
     */
    SenceManager.prototype.unRegister = function (key) {
        if (this.sences[key]) {
            this.sences[key] = null;
            delete this.sences[key];
        }
    };
    /**
     * 摧毁场景
     * @param key 场景标识
     */
    SenceManager.prototype.destroy = function (key) {
        if (this.sences[key]) {
            this.closeSence(key, true);
        }
    };
    /**
     * 打开一个场景层
     * @param key 场景标识
     * @param source  场景资源
     */
    SenceManager.prototype.openSence = function (key, source, oldSence) {
        var sence = this.sences[key];
        if (!sence)
            return;
        sence.onEnter();
        App.getStageUtils().addToStage(sence);
        this._currScene = key;
    };
    /**
     * 切换场景
     * @param tokey 目标场景标识
     */
    SenceManager.prototype.changeSence = function (tokey, source) {
        var newSence = this.sences[tokey];
        if (!newSence)
            return;
        var oldSecne = this.sences[this._currScene];
        oldSecne.onExit();
        App.getStageUtils().removeFormStage(oldSecne);
        this.openSence(tokey, source, oldSecne);
    };
    /**
     * 关闭场景
     * @param key 场景标识
     * @param force 是否销毁场景
     */
    SenceManager.prototype.closeSence = function (key, force) {
        var sence = this.sences[key];
        if (!sence)
            return;
        this.unRegister(key);
        App.getStageUtils().removeFormStage(sence);
        sence.onExit(force);
    };
    return SenceManager;
}(SingtonClass));
__reflect(SenceManager.prototype, "SenceManager");
