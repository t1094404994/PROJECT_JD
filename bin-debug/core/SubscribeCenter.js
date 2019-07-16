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
 * 订阅模式 中间管理者
 * 使用对象-数组(名称-订阅者们) 所有方法均在线性时间复杂度内完成
 * 订阅者需要有一个订阅名字相同的函数接收,方便直接回调
 * by txz 2019.6.17
 */
var SubscribeCenter = (function (_super) {
    __extends(SubscribeCenter, _super);
    function SubscribeCenter() {
        var _this = _super.call(this) || this;
        _this.subscribeTypes = {};
        return _this;
    }
    /**
     * 订阅
     * @param name 订阅的名字
     * @param who 订阅者
     */
    SubscribeCenter.prototype.subscribe = function (name, who) {
        if (!this.subscribeTypes.hasOwnProperty(name))
            this.subscribeTypes[name] = [];
        var subscribes = this.subscribeTypes[name];
        if (subscribes.indexOf(who) != -1)
            return;
        subscribes.push(who);
    };
    /**
     * 取关
     * @param name 订阅的名字
     * @param who  订阅者
     */
    SubscribeCenter.prototype.unSubscribe = function (name, who) {
        if (!this.subscribeTypes.hasOwnProperty(name))
            return;
        var subscribes = this.subscribeTypes[name];
        var index = subscribes.indexOf(who);
        if (index != -1)
            subscribes.splice(index, 1);
        if (!subscribes.length)
            delete this.subscribeTypes[name];
    };
    /**
     * 派送
     * @param name 派送的名字
     */
    SubscribeCenter.prototype.deliver = function (name) {
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        var subscribes = this.subscribeTypes[name];
        for (var _a = 0, subscribes_1 = subscribes; _a < subscribes_1.length; _a++) {
            var k = subscribes_1[_a];
            var fun = k[name];
            if (fun) {
                if (arg && arg.length > 0)
                    fun.apply(k, arg);
                else
                    fun.call(k);
            }
        }
    };
    return SubscribeCenter;
}(SingtonClass));
__reflect(SubscribeCenter.prototype, "SubscribeCenter");
