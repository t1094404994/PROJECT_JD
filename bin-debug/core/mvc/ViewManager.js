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
 * 窗口主控管理类
 */
var ViewManager = (function (_super) {
    __extends(ViewManager, _super);
    function ViewManager() {
        var _this = _super.call(this) || this;
        _this._views = {};
        _this._openViews = [];
        return _this;
    }
    /**
     * 清理处理
     */
    ViewManager.prototype.clear = function () {
        this.closeAll();
        this._views = {};
    };
    /**
     * 界面注册
     * @param key 标识
     * @param view 界面
     */
    ViewManager.prototype.register = function (key, view) {
        if (this._views[key])
            return false; //已存在
        this._views[key] = view;
        return true;
    };
    /**
     * 解除界面注册
     * @param key 标识
     */
    ViewManager.prototype.unregister = function (key) {
        var view = this._views[key];
        if (!view)
            return;
        view = null;
        delete this._views[key];
    };
    /**
     * 销毁界面
     * @param key 标识
     * @param newView 新界面
     */
    ViewManager.prototype.destroy = function (key, newView) {
        if (newView === void 0) { newView = null; }
        var oldView = this._views[key];
        if (oldView) {
            oldView.destroy();
            oldView = null;
            delete this._views[key];
        }
        if (newView)
            this.register(key, newView);
    };
    /**
     * 打开窗口
     * @param key 标识
     * @param param 窗口参数
     */
    ViewManager.prototype.open = function (key) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var view = this.getView(key);
        if (view == null) {
            console.log("提前注册窗口界面");
            return;
        }
        if (view.isShow()) {
            view.open.apply(//是否显示
            view, param);
            return view;
        }
        if (view.isInit()) {
            view.addToParent();
            view.open.apply(view, param);
        }
        else {
            //App.getEasyLoading().show();
            view.loadResource(App.getEasyLoading().setProgress, function () {
                view.setVisible(false);
                view.addToParent();
                //App.getEasyLoading().hide();
            }.bind(this), function () {
                view.initUI();
                view.initData();
                view.setVisible(true);
                view.open.apply(view, param);
            }.bind(this));
        }
        this._openViews.push(key);
        return view;
    };
    /**
     * 关闭界面
     * @param key 标识
     */
    ViewManager.prototype.close = function (key) {
        var view = this.getView(key);
        if (!view)
            return false; //没有注册界面
        if (!this.isShow(key))
            return false; //没有打开
        var index = this._openViews.indexOf(key);
        if (index >= 0) {
            this._openViews.splice(index, 1);
        }
        view.removeFromParent();
        view.close();
        return true;
    };
    /**
     * 根据唯一标识获取一个UI对象
     * @param key
     */
    ViewManager.prototype.getView = function (key) {
        return this._views[key];
    };
    /**
     * 关闭所有开启中的UI
     */
    ViewManager.prototype.closeAll = function () {
        var l = this._openViews.length;
        while (l--) {
            this.close(this._openViews[0]);
        }
    };
    /**
     * 当前ui打开数量
     * @returns {number}
     */
    ViewManager.prototype.currOpenNum = function () {
        return this._openViews.length;
    };
    /**
     * 检测一个UI是否开启中
     * @param key
     * @returns {boolean}
     */
    ViewManager.prototype.isShow = function (key) {
        return this._openViews.indexOf(key) != -1;
    };
    return ViewManager;
}(SingtonClass));
__reflect(ViewManager.prototype, "ViewManager");
