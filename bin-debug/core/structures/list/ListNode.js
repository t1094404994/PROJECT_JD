var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 列表节点
 * by txz 2019.5.22
 * ADT:
 * data() 当前系欸但所存的数据对象
 * pred() 前驱节点
 * succ() 后继节点
 * insertAsPred(e) 插入前驱节点,存入被引用的对象e,返回新节点的位置
 * insertAsSucc(e) 插入后继节点,同上
 */
var ListNode = (function () {
    function ListNode(data) {
        if (data)
            this._data = data;
    }
    ListNode.prototype.insertAsPred = function (e) {
        e.succ = this;
        e.pred = this.pred;
        this.pred = null;
        this.pred = e;
        e.pred.succ = null;
        e.pred.succ = e;
    };
    ListNode.prototype.insertAsSucc = function (e) {
        e.pred = this;
        e.succ = this.succ;
        this.succ = null;
        this.succ = e;
        e.succ.pred = null;
        e.succ.pred = e;
    };
    Object.defineProperty(ListNode.prototype, "data", {
        get: function () { return this._data; },
        set: function (v) { this._data = v; },
        enumerable: true,
        configurable: true
    });
    /**自定义比较器 大于*/
    ListNode.prototype.over = function (e) {
        return this.data > e.data;
    };
    ;
    /**自定义比较器 小于*/
    ListNode.prototype.less = function (e) {
        return this.data < e.data;
    };
    /**自定义比较器 等于*/
    ListNode.prototype.equal = function (e) {
        return this.data == e.data;
    };
    /**
     * 销毁回收
     **/
    ListNode.prototype.dispose = function (isForce) {
        //this._data=null;
        this.succ = null;
        this.pred = null;
        this._data = null;
    };
    /**
     * 对象重置
     **/
    ListNode.prototype.reset = function () {
        this.succ = null;
        this.pred = null;
        this._data = null;
    };
    return ListNode;
}());
__reflect(ListNode.prototype, "ListNode", ["ICacheObject"]);
