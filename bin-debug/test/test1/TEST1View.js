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
        _this.h = 900;
        _this.width = App.getStageUtils().getWidth();
        _this.height = App.getStageUtils().getHeight();
        //this.polygon();
        _this.addTrack();
        return _this;
    }
    TEST1View.prototype.start = function () {
        for (var i = 0; i < this.displays.length; i++) {
            this.addChild(this.displays[i]);
        }
        this.world.on("postStep", this.mapping.bind(this));
        App.getFrameManager().creadFrameHander(this.add, this, 1, -1);
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
        var height = this.h;
        //创建背景
        var back = DisplayUtils.createRect(1200, height, 600, height / 2, 0xFFFFFF);
        this.displays.push(back);
        //创建底板
        var panle = DisplayUtils.createRect(800, 10, 400, height);
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
            //相对自身的位置
            path = plygon.getChangePath();
            p = plygon.getPoint();
            display = DisplayUtils.ceratePolygon(path, p.x, p.y);
            //父对象位置
            path = plygon.getPath();
            //物理世界的位置
            pts = DisplayUtils.pointToArr(path, height);
            body = PhysicsUtils.createConcave(p2.Body.DYNAMIC, display, this.world, height, 1, pts);
            //创建物理多边形成功
            if (body != null) {
                this.displays.push(display);
                this.addChild(display);
                this.bodys.push(body);
            }
        };
        this.world.on("addBody", function (evt) {
            evt.body.setDensity(1);
        });
        plygon.onEvt(this, true, complete);
        this.start();
    };
    /**
     * 添加一个追踪体
     */
    TEST1View.prototype.addTrack = function () {
        var circle = DisplayUtils.cerateCircle(50, 200, 200, 2);
        var tarck = new Track();
        tarck._displays = [circle];
        tarck.setPA([200, 200]);
        this.tarck = tarck;
        this.displays = [circle];
        //高度
        var height = this.h;
        //创建背景
        var back = DisplayUtils.createRect(1200, height, 600, height / 2, 0xFFFFFF);
        this.displays.push(back);
        App.getFrameManager().creadFrameHander(this.onTrack, this, 10, -1);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.addChild(back);
        this.addChild(circle);
    };
    /**驱动跟踪体*/
    TEST1View.prototype.onTrack = function () {
        if (this.tarck.start) {
            this.tarck.onStep(20);
            var circle = this.tarck._displays[0];
            circle.x = this.tarck.x;
            circle.y = this.tarck.y;
        }
    };
    TEST1View.prototype.onTap = function (evt) {
        this.tarck.reset();
        this.tarck.setPB([evt.localX, evt.localY]);
        this.tarck.start = true;
    };
    /**物理世界前进,并且同步所有显示对象*/
    TEST1View.prototype.add = function () {
        if (this.timeSinceLastCall == undefined) {
            this.timeSinceLastCall = Date.now() / 1000; //单位秒
            this.world.step(PhysicsUtils.frameTime);
        }
        else {
            this.timeSinceLastCall = Date.now() / 1000 - this.timeSinceLastCall;
            //maxSubSteps 跳帧的最大步长,如果间隔超过单位时间*步长,就会失速 如果最大步长太大,间隔太久,容易造成顿卡
            this.world.step(PhysicsUtils.frameTime, this.timeSinceLastCall, 10);
            this.timeSinceLastCall = Date.now() / 1000;
        }
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
