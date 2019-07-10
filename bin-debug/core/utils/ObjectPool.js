var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 基于栈结构的对象池
 * by txz 2019.6.11
 * ADT:
 * getObject(ICacheObject) //取对象
 * backObject(ICacheObject) //还对象
 * gc() //定时销毁无用对象
 */
var ObjectPool = (function () {
    function ObjectPool() {
        this.gcTime = 600000; //对象池无用对象销毁时间毫秒
        this.pool = {};
    }
    Object.defineProperty(ObjectPool.prototype, "instance", {
        get: function () {
            if (!ObjectPool._instance)
                ObjectPool._instance = new ObjectPool();
            return ObjectPool._instance;
        },
        enumerable: true,
        configurable: true
    });
    ObjectPool.prototype.getObject = function (obj) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var objName = egret.getQualifiedClassName(obj);
        var list = this.pool[objName];
        if (!list || !list.length)
            return new (obj.bind.apply(obj, [void 0].concat(args)))();
        var getObj = list.pop();
        getObj.useCount = 1;
        return getObj;
    };
    ObjectPool.prototype.backObject = function (obj) {
        var objName = egret.getQualifiedClassName(obj);
        if (!this.pool[objName])
            this.pool[objName] = [];
        var list = this.pool[objName];
        list.push(obj);
        obj.reset();
        obj.useCount = 0;
        obj.backTime = Date.now();
    };
    ObjectPool.prototype.gc = function () {
        var list;
        var timeline = Date.now() - this.gcTime; //放入时间点分割
        for (var k in this.pool) {
            list = this.pool[k];
            var len = list.length;
            while (len--) {
                var obj = list[len];
                if (list[len].backTime < timeline) {
                    for (var i = 0; i <= len; i++) {
                        list[i].dispose();
                    }
                    list.slice(0, len);
                    break;
                }
            }
            if (!list.length)
                delete this.pool[k];
        }
    };
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
