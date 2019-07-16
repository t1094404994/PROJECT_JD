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
var LoginSence = (function (_super) {
    __extends(LoginSence, _super);
    function LoginSence() {
        var _this = _super.call(this) || this;
        _this.width = 900;
        _this.height = 1600;
        return _this;
    }
    LoginSence.prototype.onEnter = function () {
        var loginController = new LoginController();
        var loginModel = new LoginModel(loginController);
        loginController.setModel(loginModel);
        App.getControllerManager().register(ControllerConst.LOGIN, loginController);
        App.getViewManger().register(ViewConst.LOGIN, new LoginView(loginController, this));
        loginController.openView(ViewConst.LOGIN);
    };
    LoginSence.prototype.onExit = function () {
        App.getViewManger().close(ViewConst.LOGIN);
    };
    LoginSence.prototype.destroy = function () {
    };
    return LoginSence;
}(BaseSence));
__reflect(LoginSence.prototype, "LoginSence");
