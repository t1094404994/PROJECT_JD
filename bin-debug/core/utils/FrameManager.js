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
 * 帧刷工具类(也可以定时刷)
 * 本质回调派发器,只是每帧检测
 * by txz extends yangsong@github
 */
var FrameManager = (function (_super) {
    __extends(FrameManager, _super);
    function FrameManager() {
        var _this = _super.call(this) || this;
        _this.currTime = egret.getTimer();
        _this.frame = 0;
        _this.frameHanders = [];
        egret.startTick(_this.onTick, _this);
        return _this;
    }
    FrameManager.prototype.onTick = function (t) {
        this.frame++;
        var frameHander;
        this.currTime = t;
        var len = this.frameHanders.length;
        for (var i = 0; i < len; i++) {
            frameHander = this.frameHanders[i];
            if (frameHander.freezed)
                continue;
            if ((frameHander.frameFalsh && this.frame - frameHander.lastframe >= frameHander.delay)) {
                frameHander.callFun.call(frameHander.callObj, t - frameHander.lastTime);
                frameHander.lastframe = this.frame;
                frameHander.lastTime = t;
                frameHander.haveCallTimes++;
                if (frameHander.haveCallTimes == frameHander.callTimes) {
                    if (frameHander.comCallFun)
                        frameHander.comCallFun.call(frameHander.callObj);
                    this.frameHanders.splice(+i, 1);
                    len--;
                    i--;
                }
            }
            else if (!frameHander.frameFalsh && t - frameHander.lastTime >= frameHander.delay) {
                frameHander.callFun.call(frameHander.callObj, t - frameHander.lastTime);
                frameHander.lastframe = this.frame;
                frameHander.lastTime = t;
                frameHander.haveCallTimes++;
                if (frameHander.haveCallTimes == frameHander.callTimes) {
                    if (frameHander.comCallFun)
                        frameHander.comCallFun.call(frameHander.callObj);
                    this.frameHanders.splice(+i, 1);
                    len--;
                    i--;
                }
            }
        }
        return false;
    };
    //暂停所有
    FrameManager.prototype.stop = function () {
        egret.stopTick(this.onTick, this);
    };
    //重新开始
    FrameManager.prototype.start = function () {
        this.currTime = egret.getTimer();
        egret.startTick(this.onTick, this);
    };
    FrameManager.prototype.addHander = function (cF, cO, frF, de, cT, ccF, fre) {
        if (de === void 0) { de = -1; }
        if (cT === void 0) { cT = -1; }
        if (ccF === void 0) { ccF = null; }
        if (fre === void 0) { fre = false; }
        var frameHander = this.isExists(cF, cO);
        if (frameHander)
            return frameHander;
        frameHander = new FrameHander(cF, cO, frF, de, cT, ccF, fre);
        frameHander.lastTime = this.currTime;
        frameHander.lastframe = this.frame;
        this.frameHanders.push(frameHander);
        return frameHander;
    };
    /**
     * 创建帧回调
     * @param cF 执行函数
     * @param cO  执行者
     * @param de 刷新帧
     * @param cT 执行次数
     * @param ccF 完成
     * @param fre 是否冷冻
     */
    FrameManager.prototype.creadFrameHander = function (cF, cO, de, cT, ccF, fre) {
        if (de === void 0) { de = -1; }
        if (cT === void 0) { cT = -1; }
        if (ccF === void 0) { ccF = null; }
        if (fre === void 0) { fre = false; }
        var frF = true;
        return this.addHander(cF, cO, frF, de, cT, ccF, fre);
    };
    /**
     * 创建
     * @param cF 执行函数
     * @param cO  执行者
     * @param de 刷新时间
     * @param cT 执行次数
     * @param ccF 完成
     * @param fre 是否冷冻
     */
    FrameManager.prototype.creadTimeHander = function (cF, cO, de, cT, ccF, fre) {
        if (de === void 0) { de = -1; }
        if (cT === void 0) { cT = -1; }
        if (ccF === void 0) { ccF = null; }
        if (fre === void 0) { fre = false; }
        var frF = false;
        return this.addHander(cF, cO, frF, de, cT, ccF, fre);
    };
    /**
     * 无序向量单查重,不会出现多个重复，所以可在线性时间内完成
     * @param callFun
     * @param callObj
     * @param force 是否删除
     */
    FrameManager.prototype.isExists = function (callFun, callObj, force) {
        if (force === void 0) { force = false; }
        for (var i in this.frameHanders) {
            var k = this.frameHanders[i];
            if (k.callFun == callFun && k.callObj == k.callObj) {
                if (force)
                    this.frameHanders.splice(+i, 1);
                return k;
            }
        }
        return null;
    };
    /**
     * 删除已经存在的Hander
     * @param callFun 之前加入的回调
     * @param callObj 之前加入的回调对象
     */
    FrameManager.prototype.removeHander = function (callFun, callObj) {
        this.isExists(callFun, callObj, true);
    };
    return FrameManager;
}(SingtonClass));
__reflect(FrameManager.prototype, "FrameManager");
//帧刷调用类
var FrameHander = (function () {
    /**
     * 构造
     * @param cF 执行函数
     * @param cO  执行者
     * @param frF 是否是帧刷新
     * @param de 刷新帧或者时间
     * @param cT 执行次数
     * @param ccF 完成
     * @param fre 是否冷冻
     */
    function FrameHander(cF, cO, frF, de, cT, ccF, fre) {
        if (de === void 0) { de = -1; }
        if (cT === void 0) { cT = -1; }
        if (ccF === void 0) { ccF = null; }
        if (fre === void 0) { fre = false; }
        this.callFun = cF;
        this.callObj = cO;
        this.frameFalsh = frF;
        this.delay = de;
        this.callTimes = cT;
        this.comCallFun = ccF;
        this.freezed = fre;
        this.haveCallTimes = 0;
    }
    FrameHander.prototype.clear = function () {
        this.callFun = null;
        this.callObj = null;
        this.comCallFun = null;
    };
    return FrameHander;
}());
__reflect(FrameHander.prototype, "FrameHander");
