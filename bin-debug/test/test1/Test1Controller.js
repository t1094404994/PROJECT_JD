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
var Test1Controller = (function (_super) {
    __extends(Test1Controller, _super);
    function Test1Controller() {
        return _super.call(this) || this;
    }
    return Test1Controller;
}(BaseController));
__reflect(Test1Controller.prototype, "Test1Controller");
