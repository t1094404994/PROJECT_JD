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
 * controller的主控管理类
 */
var ControllerManager = (function (_super) {
    __extends(ControllerManager, _super);
    function ControllerManager() {
        var _this = _super.call(this) || this;
        _this._modules = {};
        return _this;
    }
    /**
     * 清空处理
     */
    ControllerManager.prototype.clear = function () {
        this._modules = {};
    };
    /**
     * 注册控制器
     * @param key 控制器标识
     * @param control 控制器
     * @param replace 如果已经存在,是否替换
     */
    ControllerManager.prototype.register = function (key, control, replace) {
        if (replace === void 0) { replace = false; }
        if (this._modules[key] && !replace)
            return;
        this._modules[key] = control;
    };
    /**
     * 解除控制器
     * @param key 控制器标识
     */
    ControllerManager.prototype.unrgister = function (key) {
        if (!this._modules[key])
            return;
        this._modules[key] = null;
        delete this._modules[key];
    };
    /**
     * 跨模块消息传递
     * @param controlerD 控制器标识
     * @param key 消息标识
     * @param param 参数
     */
    ControllerManager.prototype.applyFunc = function (controlerD, key) {
        var param = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            param[_i - 2] = arguments[_i];
        }
        var controler = this._modules[controlerD];
        if (controler) {
            return controler.applyFunc(key, param);
        }
        else {
            console.log("模块" + controlerD + "不存在");
            return null;
        }
    };
    /**
     * 获取指定Controller的Model对象
     * @param controllerD Controller唯一标识
     * @returns {BaseModel}
     */
    ControllerManager.prototype.getControllerModel = function (controllerD) {
        var manager = this._modules[controllerD];
        if (manager) {
            return manager.getModel();
        }
        return null;
    };
    return ControllerManager;
}(SingtonClass));
__reflect(ControllerManager.prototype, "ControllerManager");
