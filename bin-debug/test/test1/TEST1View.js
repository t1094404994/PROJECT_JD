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
        for (var i = 0; i < this.displays.length; i++) {
            this.addChild(this.displays[i]);
        }
        this.world.on("postStep", function () {
            var len = this.bodys.length;
            for (var i = 0; i < len; i++) {
                this.body = this.bodys[i];
                PhysicsUtils.mapping(this.body, this.h);
            }
        }.bind(this));
        App.getFrameManager().creadFrameHander(this.add, this, 1, -1);
    };
    TEST1View.prototype.createGround = function () {
        this.createWorld();
        this.displays = [];
        this.bodys = [];
        this.display = this.cerateRect(800, 10, 0, 800);
        this.body = PhysicsUtils.createGround(1, this.world, [this.display], 1001, 1, this.h, this.display.width, this.display.height, this.display.x, this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        var vmaterial = new p2.Material(103);
        this.body.shapes[0].material = vmaterial;
        this.display = this.cerateRect(50, 50, 400, 100);
        this.body = PhysicsUtils.createGround(0, this.world, [this.display], 1002, 1, this.h, this.display.width, this.display.height, this.display.x, this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        this.body.mass = 2;
        var ice = new p2.Material(101);
        this.body.shapes[0].material = ice;
        this.display = this.cerateRect(50, 50, 300, 100);
        this.body = PhysicsUtils.createGround(0, this.world, [this.display], 1003, 1, this.h, this.display.width, this.display.height, this.display.x, this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        var steel = new p2.Material(102); //材料
        this.body.shapes[0].material = steel; //设置材料
        var contactMaterial = new p2.ContactMaterial(ice, steel, { friction: 0.03 }); //设置两个材料的接触
        var contactMaterial2 = new p2.ContactMaterial(ice, vmaterial, { friction: 0.05 });
        var contactMaterial3 = new p2.ContactMaterial(steel, vmaterial, { friction: 0.3 });
        this.world.addContactMaterial(contactMaterial); //应用到世界里
        this.world.addContactMaterial(contactMaterial2);
        this.world.addContactMaterial(contactMaterial3);
        for (var i = 0; i < this.displays.length; i++) {
            this.addChild(this.displays[i]);
        }
        this.world.on("postStep", function () {
            var len = this.bodys.length;
            for (var i = 0; i < len; i++) {
                this.body = this.bodys[i];
                PhysicsUtils.mapping(this.body, this.h);
            }
        }.bind(this));
        //求解器 解决一个线性方程组的运算法则 ,它处理着约束，接触，摩擦。
        //GSSolver求解器是最稳定的
        // let solver:p2.GSSolver=new p2.GSSolver();
        // this.world.solver=solver;
        // solver.tolerance=0.01;
        // solver.equations[0].stiffness=0x1e8;
        // equation.relaxation = 4;
        // equation.updateSpookParams(timeStep);
        // p2.RevoluteConstraint()
        //设置重复次数 越多就越精确
        //solver.iterations=50;
        App.getFrameManager().creadFrameHander(this.add, this, 1, -1);
    };
    /**车*/
    TEST1View.prototype.car = function () {
        this.createWorld();
        this.displays = [];
        this.bodys = [];
        //地面
        this.display = this.cerateRect(800, 10, 0, 800);
        this.body = PhysicsUtils.createGround(1, this.world, [this.display], 1001, 1, this.h, this.display.width, this.display.height, this.display.x, this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        // Create chassis for our car 底盘
        this.display = this.cerateRect(300, 100, 300, 300);
        this.body = PhysicsUtils.createGround(1, this.world, [this.display], 1002, 0, 800, this.display.width, this.display.height, this.display.x, this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        // Create wheels 轮子
        this.display = this.cerateCircle(30, 150, 350, 0xFFE054);
        var p = PhysicsUtils.epToPp(this.display.x, this.display.y, 800);
        var wheelsBody = new p2.Body({ mass: 0, position: [p.x, p.y], type: p2.Body.DYNAMIC, angularVelocity: 1 });
        var wheelsPanle = new p2.Circle({ width: PhysicsUtils.eVToPv(this.display.width), height: PhysicsUtils.eVToPv(this.display.height) });
        wheelsBody.displays = [this.display];
        wheelsBody.addShape(wheelsPanle);
        wheelsBody.id = 1003;
        this.displays.push(this.display);
        this.world.addBody(wheelsBody);
        this.display = this.cerateCircle(30, 450, 350, 0xFFE054);
        p = PhysicsUtils.epToPp(this.display.x, this.display.y, 800);
        wheelsBody = new p2.Body({ mass: 0, position: [p.x, p.y], type: p2.Body.DYNAMIC, angularVelocity: 1 });
        wheelsPanle = new p2.Circle({ width: PhysicsUtils.eVToPv(this.display.width), height: PhysicsUtils.eVToPv(this.display.height) });
        wheelsBody.displays = [this.display];
        wheelsBody.addShape(wheelsPanle);
        wheelsBody.id = 1004;
        this.displays.push(this.display);
        this.world.addBody(wheelsBody);
        this.start();
    };
    /**物理世界前进,并且同步所有显示对象*/
    TEST1View.prototype.add = function () {
        this.world.step(PhysicsUtils.frameTime);
        // let len:number=this.bodys.length;
        // for(let i=0;i<len;i++){
        //     this.body=this.bodys[i];
        //     PhysicsUtils.mapping(this.body,this.h);
        // }
    };
    //创建一个方块
    TEST1View.prototype.cerateRect = function (w, h, x, y, color) {
        if (color === void 0) { color = 0x000000; }
        var rect = new eui.Rect(w, h, color);
        rect.anchorOffsetX = w >> 1;
        rect.anchorOffsetY = h >> 1;
        rect.x = x + w >> 1;
        rect.y = y + h >> 1;
        return rect;
    };
    //创建一个圆
    TEST1View.prototype.cerateCircle = function (r, x, y, color) {
        if (color === void 0) { color = 0x0000000; }
        var shape = new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(x, y, r);
        shape.graphics.endFill();
        shape.anchorOffsetX = r >> 1;
        shape.anchorOffsetY = r >> 1;
        shape.x = x + r >> 1;
        shape.y = y + r >> 1;
        return shape;
    };
    TEST1View.prototype.createWorld = function () {
        var world = new p2.World({ gravity: [0, 0], islandSplit: true });
        this.world = world;
        world.sleepMode = p2.World.BODY_SLEEPING;
    };
    TEST1View.prototype.onTap = function () {
    };
    return TEST1View;
}(BaseEuiView));
__reflect(TEST1View.prototype, "TEST1View");
