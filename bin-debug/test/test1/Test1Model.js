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
var Test1Model = (function (_super) {
    __extends(Test1Model, _super);
    function Test1Model($controller) {
        var _this = _super.call(this, $controller) || this;
        _this.infors = [];
        _this.infors.push({ x: 120, y: 20, });
        return _this;
    }
    //创建浮动跳板
    Test1Model.prototype.createGround = function () {
    };
    //创建一个方块
    Test1Model.prototype.cerateRect = function (w, h, x, y) {
        var rect = new egret.Shape();
        rect.graphics.beginFill(0x000000);
        rect.graphics.drawRect(x, y, w, h);
        rect.graphics.lineStyle(2, 0xFFFFFF);
        rect.graphics.endFill();
        return rect;
    };
    return Test1Model;
}(BaseModel));
__reflect(Test1Model.prototype, "Test1Model");
