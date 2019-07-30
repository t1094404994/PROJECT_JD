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
var TEST1View = (function (_super) {
    __extends(TEST1View, _super);
    function TEST1View($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        //this.skinName="resource/skins/testView1Skin.exml";
        _this.width = App.getStageUtils().getWidth();
        _this.height = App.getStageUtils().getHeight();
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        _this.createGround();
        return _this;
    }
    //创建浮动跳板
    TEST1View.prototype.createGround = function () {
        this.createWorld();
        var foolr = this.cerateRect(800, 20, 0, 400);
        PhysicsUtils.createGround(1, this.world, [foolr], 1001, 1, 800, foolr.width, foolr.height, foolr.x, foolr.y);
        this.addChild(foolr);
        this.rect2 = this.cerateRect(50, 40, 275, 200);
        this.body2 = PhysicsUtils.createGround(0, this.world, [this.rect2], 1002, 1, 800, this.rect2.width, this.rect2.height, this.rect2.x, this.rect2.y);
        this.body2.velocity[1] = 0.1;
        this.addChild(this.rect2);
        App.getFrameManager().creadFrameHander(this.add, this, 1, -1);
    };
    TEST1View.prototype.add = function () {
        this.world.step(PhysicsUtils.frameTime);
        this.p = PhysicsUtils.ppToEp(this.body2.position[0], this.body2.position[1], 800);
        this.rect2.x = this.p.x;
        this.rect2.y = this.p.y;
        this.rect2.rotation = PhysicsUtils.prToEr(this.body2.angle);
    };
    //创建一个方块
    TEST1View.prototype.cerateRect = function (w, h, x, y) {
        var rect = new eui.Rect(w, h, 0x000000);
        rect.anchorOffsetX = w >> 1;
        rect.anchorOffsetY = h >> 1;
        rect.x = x + w >> 1;
        rect.y = y + h >> 1;
        return rect;
    };
    TEST1View.prototype.createWorld = function () {
        var world = new p2.World({ gravity: [0, -9.81] });
        this.world = world;
        world.sleepMode = p2.World.BODY_SLEEPING;
    };
    TEST1View.prototype.onTap = function () {
    };
    return TEST1View;
}(BaseEuiView));
__reflect(TEST1View.prototype, "TEST1View");
