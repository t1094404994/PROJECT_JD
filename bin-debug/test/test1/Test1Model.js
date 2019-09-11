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
