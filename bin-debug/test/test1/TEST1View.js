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
/**
 * 测试界面
 */
var TEST1View = (function (_super) {
    __extends(TEST1View, _super);
    function TEST1View($controller, $parent) {
        var _this = _super.call(this, $controller, $parent) || this;
        _this.h = 800;
        //this.skinName="resource/skins/testView1Skin.exml";
        _this.width = App.getStageUtils().getWidth();
        _this.height = App.getStageUtils().getHeight();
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        //this.createGround();
        _this.car();
        return _this;
    }
    TEST1View.prototype.start = function () {
        for (var i = 0; i < this.bodys.length; i++) {
            console.log("刚体:" + "x" + this.bodys[i].position[0] + "y" + this.bodys[i].position[1]);
        }
        for (var i = 0; i < this.displays.length; i++) {
            console.log("物体:" + this.displays[i].hashCode + "x:" + this.displays[i].x + ",y:" + this.displays[i].y);
            this.addChild(this.displays[i]);
        }
        this.world.on("postStep", this.mapping.bind(this));
        App.getFrameManager().creadFrameHander(this.add, this, 1, -1);
    };
    /**车*/
    TEST1View.prototype.car = function () {
        this.createWorld();
        this.displays = [];
        this.bodys = [];
        //高度
        var height = 805;
        //地面
        var ground = DisplayUtils.createRect(800, 10, 400, 805, 0x000000);
        this.displays.push(ground);
        ground.rotation = -10;
        var panle = PhysicsUtils.createSimpleBox(p2.Body.wSTATIC, ground, this.world, height, 0);
        //车轮
        var shape = DisplayUtils.cerateCircle(50, 0, 250, 0xFFFFFF, 2);
        this.displays.push(shape);
        var wheelBody1 = PhysicsUtils.createSimpleCircle(p2.Body.DYNAMIC, shape, this.world, height);
        shape = DisplayUtils.cerateCircle(50, 200, 250, 0xFFFFFF, 2);
        this.displays.push(shape);
        var wheelBody2 = PhysicsUtils.createSimpleCircle(p2.Body.DYNAMIC, shape, this.world, height);
        //车身
        var rect = DisplayUtils.createRect(200, 200, 100, 100, 0x7F4B4B);
        this.displays.push(rect);
        var chassisBody = PhysicsUtils.createSimpleBox(p2.Body.DYNAMIC, rect, this.world, height);
        //刚体加入物理世界
        this.bodys.push(panle);
        this.bodys.push(wheelBody1);
        this.bodys.push(wheelBody2);
        this.bodys.push(chassisBody);
        //创建车轮和车身的旋转约束(节点)
        var constraint1 = new p2.RevoluteConstraint(chassisBody, wheelBody1, {
            localPivotA: [-2, -3],
            localPivotB: [0, 0],
            collideConnected: false
        });
        var constraint2 = new p2.RevoluteConstraint(chassisBody, wheelBody2, {
            localPivotA: [2, -3],
            localPivotB: [0, 0],
            collideConnected: false
        });
        this.world.addConstraint(constraint1);
        this.world.addConstraint(constraint2);
        this.start();
    };
    /**物理世界前进,并且同步所有显示对象*/
    TEST1View.prototype.add = function () {
        this.world.step(PhysicsUtils.frameTime);
    };
    TEST1View.prototype.createWorld = function () {
        var world = new p2.World({ gravity: [0, -9.8], islandSplit: true });
        this.world = world;
        world.sleepMode = p2.World.BODY_SLEEPING;
    };
    TEST1View.prototype.onTap = function () {
    };
    TEST1View.prototype.mapping = function () {
        var len = this.bodys.length;
        for (var i = 0; i < len; i++) {
            this.body = this.bodys[i];
            PhysicsUtils.mapping(this.body, this.h);
        }
    };
    return TEST1View;
}(BaseEuiView));
__reflect(TEST1View.prototype, "TEST1View");
