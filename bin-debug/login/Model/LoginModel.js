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
var LoginModel = (function (_super) {
    __extends(LoginModel, _super);
    function LoginModel($controller) {
        var _this = _super.call(this, $controller) || this;
        _this._controller.registerFunc("onTap", _this.onTap, _this);
        return _this;
    }
    LoginModel.prototype.onTap = function () {
        var source = ["testtttt"];
        App.getEasyLoading().loadSource(source, this.souceCom.bind(this));
    };
    LoginModel.prototype.souceCom = function () {
        var sence = new Test1Sence();
        App.getSenceManger().register(SenceConst.TEST1, sence);
        App.getSenceManger().changeSence(SenceConst.TEST1);
        this._controller.compleClose(ViewConst.LOGIN);
    };
    return LoginModel;
}(BaseModel));
__reflect(LoginModel.prototype, "LoginModel");
