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
