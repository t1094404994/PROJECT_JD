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
var TEST1View = (function (_super) {
    __extends(TEST1View, _super);
    function TEST1View($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        _this.skinName = "resource/skins/testView1Skin.exml";
        return _this;
    }
    return TEST1View;
}(BaseEuiView));
__reflect(TEST1View.prototype, "TEST1View");
