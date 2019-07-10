var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 控制器,连接数据模型和视图
 * view的一个策略,决定如何使用
 */
var BaseController = (function () {
    /**
     * 构造函数
     */
    function BaseController() {
        this._messages = {};
    }
    /**
     * 注册本模块消息
     * @param key 唯一标识
     * @param callbackFunc 侦听函数
     * @param callbackObj 侦听函数所属对象
     */
    BaseController.prototype.registerFunc = function (key, callbackFunc, callbackObj) {
        this._messages[key] = [callbackFunc, callbackObj];
    };
    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    BaseController.prototype.applyFunc = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var listen = this._messages[key];
        if (listen) {
            return listen[0].apply(listen[1], param);
        }
        else {
            console.log("消息" + key + "不存在侦听");
            return null;
        }
    };
    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    BaseController.prototype.applyControllerFunc = function (controllerKey, key) {
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            param[_i - 2] = arguments[_i];
        }
        return App.getControllerManager().applyFunc(controllerKey, key, param);
    };
    /**
     * 设置该模块使用的Model对象
     * @param model
     */
    BaseController.prototype.setModel = function (model) {
        this._model = model;
    };
    /**
     * 获取该模块的Model对象
     * @returns {BaseModel}
     */
    BaseController.prototype.getModel = function () {
        return this._model;
    };
    /**
     * 获取指定Controller的Model对象
     * @param controllerD Controller唯一标识
     * @returns {BaseModel}
     */
    BaseController.prototype.getControllerModel = function (controllerD) {
        return App.getControllerManager().getControllerModel(controllerD);
    };
    /**
     * View注册
     * @param viewClassZ View的类
     * @param viewId View的ID
     * @param viewParent View的父级
     * @returns {IBaseView}
     */
    BaseController.prototype.registerView = function (viewClass, viewId, viewParent) {
        var view = new viewClass(this, viewParent);
        App.getViewManger().register(viewId, view);
        return view;
    };
    /**
     * View打开
     * @param viewId View的ID
     * @param param 参数
     */
    BaseController.prototype.openView = function (viewId) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        (_a = App.getViewManger()).open.apply(_a, [viewId].concat(param));
        var _a;
    };
    /**
     * View关闭
     * @param viewId View的ID
     * @param param 参数
     */
    BaseController.prototype.closeView = function (viewId) {
        App.getViewManger().close(viewId);
    };
    /**
     * 完全关闭
     * @param viewId View的ID
     * @param force 是否完全清除
     */
    BaseController.prototype.compleClose = function (viewId, force) {
        this._messages = null;
        this._model = null;
        this.closeView(viewId);
        if (force)
            App.getViewManger().destroy(viewId);
        else
            App.getViewManger().unregister(viewId);
    };
    return BaseController;
}());
__reflect(BaseController.prototype, "BaseController");
