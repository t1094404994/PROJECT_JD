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
var LoginSence = (function (_super) {
    __extends(LoginSence, _super);
    function LoginSence() {
        var _this = _super.call(this) || this;
        _this.width = 640;
        _this.height = 1136;
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
