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
var Test1Sence = (function (_super) {
    __extends(Test1Sence, _super);
    function Test1Sence() {
        var _this = _super.call(this) || this;
        _this.width = 640;
        _this.height = 1136;
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
