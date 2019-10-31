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
        //this.createGround();
        //this.car();
        //this.circles();
        _this.polygon();
        return _this;
    }
    TEST1View.prototype.start = function () {
        // for(let i=0;i<this.bodys.length;i++){
        //     console.log("刚体:"+"x"+this.bodys[i].position[0]+"y"+this.bodys[i].position[1]);
        // }
        for (var i = 0; i < this.displays.length; i++) {
            //console.log("物体:"+this.displays[i].hashCode+"x:"+this.displays[i].x+",y:"+this.displays[i].y)
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
        ground.rotation = 10;
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
    //40*40框 宽高800  从300-1100 半径10 xy随机20*
    TEST1View.prototype.circles = function () {
        //初始化
        this.createWorld();
        this.displays = [];
        this.bodys = [];
        //世界高度
        var height = 1100;
        //创建一个底板
        var panle = DisplayUtils.createRect(800, 10, 400, 1100);
        this.displays.push(panle);
        var panlebody = PhysicsUtils.createSimpleBox(p2.Body.wSTATIC, panle, this.world, height, 0);
        this.bodys.push(panlebody);
        //创造20*20个圆
        var N = 20;
        var S = 40;
        var MinY = 300;
        var MinX = 0;
        var circle;
        var body;
        var X;
        var Y;
        var color;
        var max = 0xFFFFFF;
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < N; j++) {
                X = MinX + S * j + N + N * Math.random();
                Y = MinY + S * i + N + N * Math.random();
                color = Math.random() * max;
                circle = DisplayUtils.cerateCircle(N >> 1, X, Y, color, 0);
                this.displays.push(circle);
                body = PhysicsUtils.createSimpleCircle(p2.Body.DYNAMIC, circle, this.world, height);
                this.bodys.push(body);
            }
        }
        //设置对象池 增加运行效率
        // Pre-fill object pools. Completely optional but good for performance!
        this.world.overlapKeeper.recordPool.resize(16);
        this.world.narrowphase.contactEquationPool.resize(1024);
        this.world.narrowphase.frictionEquationPool.resize(1024);
        // Set stiffness of all contacts and constraints
        this.world.setGlobalStiffness(1e8);
        var solver = new p2.GSSolver();
        this.world.solver = solver;
        // Max number of solver iterations to do
        solver.iterations = 20;
        // Solver error tolerance
        solver.tolerance = 0.02;
        // Enables sleeping of bodies
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.start();
    };
    /** 多边形*/
    TEST1View.prototype.polygon = function () {
        //初始化
        this.createWorld();
        this.displays = [];
        this.bodys = [];
        var display;
        var body;
        //时间高度
        var height = 1200;
        //创建背景
        var back = DisplayUtils.createRect(1200, 800, 600, 400, 0xFFFFFF);
        this.displays.push(back);
        //创建底板
        var panle = DisplayUtils.createRect(800, 10, 400, 1200);
        this.displays.push(panle);
        var panlebody = PhysicsUtils.createSimpleBox(p2.Body.wSTATIC, panle, this.world, height, 0);
        this.bodys.push(panlebody);
        //多边形
        var plygon = new Polygon();
        this.displays.push(plygon.onShape());
        var path;
        var pts;
        var p;
        var complete = function () {
            path = plygon.getPath();
            p = plygon.getPoint();
            display = DisplayUtils.ceratePolygon(path, p.x, p.y);
            pts = DisplayUtils.pointToArr(path, true, height);
            body = PhysicsUtils.createConcave(p2.Body.KINEMATIC, display, this.world, height, 1, pts);
            this.displays.push(display);
            this.addChild(display);
            //测试
            //this.bodys.push(body);
        };
        plygon.onEvt(this, true, complete);
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
