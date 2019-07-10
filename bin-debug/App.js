var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 主控程序
 */
var App = (function () {
    function App() {
    }
    /**
     * 帧或时间回调派发类
     */
    App.getFrameManager = function () {
        return FrameManager.getSingtonInstance();
    };
    /**
     * 显示对象工具类
     */
    App.getDisplayUtils = function () {
        return DisplayUtils.getSingtonInstance();
    };
    /**
     * 控制器管理类
     */
    App.getControllerManager = function () {
        return ControllerManager.getSingtonInstance();
    };
    /**
     * 通用Loading动画
     * @returns {any}
     * @constructor
     */
    App.getEasyLoading = function () {
        return EasyLoading.getSingtonInstance();
    };
    /**
     * 舞台信息
     */
    App.getStageUtils = function () {
        return StageUtils.getSingtonInstance();
    };
    /**
     * 窗口管理类
     */
    App.getViewManger = function () {
        return ViewManager.getSingtonInstance();
    };
    /**
     * 场景管理类
     */
    App.getSenceManger = function () {
        return SenceManager.getSingtonInstance();
    };
    return App;
}());
__reflect(App.prototype, "App");
