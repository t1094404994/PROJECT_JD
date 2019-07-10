var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 二叉树节点
 * by txz leran to book
 */
var BinNode = (function () {
    /**
     * 构造
     * @param e 数据
     * @param p 父节点
     * @param lc 左孩子
     * @param rc 右孩子
     * @param h 高度
     * @param l 左式堆
     * @param c 颜色
     */
    function BinNode(e, p, lc, rc, h, l, c) {
        if (p === void 0) { p = null; }
        if (lc === void 0) { lc = null; }
        if (rc === void 0) { rc = null; }
        if (h === void 0) { h = 0; }
        if (l === void 0) { l = 1; }
        if (c === void 0) { c = RBColor.RB_RED; }
        this.data = e;
        this.parent = p;
        this.lc = lc;
        this.rc = rc;
        this.height = h;
        this.npl = l;
        this.color = c;
    }
    //后代总数 TODO
    BinNode.prototype.size = function () {
        var l = 0;
        return l;
    };
    /**
     * 将e作为当前节点的左孩子插入
     * @param e 节点数据
     */
    BinNode.prototype.insertAsLC = function (e) {
        if (this.lc) {
            this.lc.data = e;
            return this.lc;
        }
        return this.lc = new BinNode(e, this);
    };
    /**
     * 将e作为当前节点的右孩子插入
     * @param e 节点数据
     */
    BinNode.prototype.insertAsRc = function (e) {
        if (this.rc) {
            this.rc.data = e;
            return this.rc;
        }
        return this.rc = new BinNode(e, this);
    };
    //取当前节点的直接后继
    BinNode.prototype.succ = function () {
        if (this.lc)
            return this.lc;
        if (this.rc)
            return this.rc;
        return null;
    };
    //子树层次遍历
    BinNode.prototype.travLevel = function () {
    };
    //子树先序遍历VLR 迭代
    BinNode.prototype.travPre = function (list) {
        var S = []; //栈保存R
        var x = this;
        //自己写的
        //while(x||S.length){
        //list(x) //操作
        // if(BinNode.HasRChild(x)) S.push(x.rc); //如果有右孩子,则保存
        // if(BinNode.HasLChild(x))   x=x.lc; //如果有左孩子,则继续深入
        // else if(S.length) x=S.pop(); //如果没有,则访问最靠近的右孩子
        // else break; //也没有,则遍历完毕
        //}
        //教材写的
        S.push(x);
        while (S.length) {
            var x_1 = S.pop();
            list(x_1);
            if (BinNode.HasRChild(x_1))
                S.push(x_1.rc);
            if (BinNode.HasLChild(x_1))
                S.push(x_1.lc);
        }
    };
    //子树中序遍历LVR 迭代
    BinNode.prototype.travIn = function (list) {
    };
    //子树后序遍历LRV 迭代
    BinNode.prototype.travPose = function (list) {
    };
    //TODO 比较器 判等器
    /**
     * 节点p的高度
     * @param p 节点
     */
    BinNode.stature = function (p) {
        return p ? p.height : -1;
    };
    BinNode.IsRoot = function (x) {
        return !x.parent;
    };
    BinNode.IsLChild = function (x) {
        return !BinNode.IsRoot(x) && x == x.parent.lc;
    };
    BinNode.IsRChild = function (x) {
        return !BinNode.IsRoot(x) && x == x.parent.rc;
    };
    BinNode.HasParent = function (x) {
        return !BinNode.IsRoot(x);
    };
    BinNode.HasLChild = function (x) {
        return x.lc;
    };
    BinNode.HasRChild = function (x) {
        return x.rc;
    };
    BinNode.HasChild = function (x) {
        return BinNode.HasLChild(x) || BinNode.HasRChild(x);
    };
    BinNode.HasBothChild = function (x) {
        return BinNode.HasLChild(x) && BinNode.HasRChild(x);
    };
    return BinNode;
}());
__reflect(BinNode.prototype, "BinNode");
//节点颜色
var RBColor;
(function (RBColor) {
    RBColor[RBColor["RB_RED"] = 0] = "RB_RED";
    RBColor[RBColor["RB_BLACK"] = 1] = "RB_BLACK";
})(RBColor || (RBColor = {}));
