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
var Test1Sence = (function (_super) {
    __extends(Test1Sence, _super);
    function Test1Sence() {
        var _this = _super.call(this) || this;
        _this.width = 900;
        _this.height = 1600;
        return _this;
    }
    Test1Sence.prototype.onEnter = function () {
        var controller = new Test1Controller();
        var model = new Test1Model(controller);
        App.getControllerManager().register(ControllerConst.TEST1, controller);
        App.getViewManger().register(ViewConst.TEST1, new TEST1View(controller, this));
        controller.setModel(model);
        controller.openView(ViewConst.TEST1);
    };
    Test1Sence.prototype.onExit = function () {
    };
    return Test1Sence;
}(BaseSence));
__reflect(Test1Sence.prototype, "Test1Sence");
