var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 显示对象工具类
 * 使用物理引擎,所有父显示对象的锚点都必须居中
 */
var DisplayUtils = (function () {
    function DisplayUtils() {
    }
    /**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    DisplayUtils.createBitmap = function (resName) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    };
    /**
     * 创建一个textField
     * @param size;
     * @param color;
     * @param otherParam;
     */
    DisplayUtils.createTextField = function (size, color, otherParam) {
        if (size === void 0) { size = 12; }
        if (color === void 0) { color = 0xFFFFFF; }
        var txt = new egret.TextField();
        txt.size = size;
        txt.textColor = color;
        if (!otherParam)
            return txt;
        for (var key in otherParam) {
            txt[key] = otherParam[key];
        }
        return txt;
    };
    /**
     * 创建一个位图字体
     */
    DisplayUtils.createBitmapFont = function (fontName) {
        var bpFont = new egret.BitmapText();
        bpFont.font = RES.getRes(fontName);
        return bpFont;
    };
    /**
     * 创建一张Gui的图片
     * @param resName
     * @returns {egret.Bitmap}
     */
    DisplayUtils.createEuiImage = function (resName) {
        var result = new eui.Image();
        var texture = RES.getRes(resName);
        result.source = texture;
        return result;
    };
    /**
     * 创建一个EUI方块
     * @param w 宽
     * @param h 高
     * @param x 中心的位置
     * @param y 中心的位置
     */
    DisplayUtils.createRect = function (w, h, x, y, color) {
        if (color === void 0) { color = 0x0000000; }
        var rect = new eui.Rect(w, h, color);
        rect.anchorOffsetX = w >> 1;
        rect.anchorOffsetY = h >> 1;
        rect.x = x;
        rect.y = y;
        return rect;
    };
    /**
     * 通过矢量绘图创建一个圆
     * @param r 半径
     * @param x 中心的位置
     * @param y 中心的位置
     * @param color 填充色
     * @param line 圆的线条粗细
     */
    DisplayUtils.cerateCircle = function (r, x, y, color, line) {
        if (color === void 0) { color = 0x000000; }
        if (line === void 0) { line = 0; }
        var shape = new egret.Shape();
        var post = line >> 1;
        shape.graphics.lineStyle(line, 0x000000);
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(r + post, r + post, r);
        shape.graphics.moveTo(r + post, r + post);
        shape.graphics.lineTo(2 * r + line, r + post);
        shape.graphics.endFill();
        shape.anchorOffsetX = shape.width >> 1;
        shape.anchorOffsetY = shape.height >> 1;
        shape.x = x;
        shape.y = y;
        return shape;
    };
    /**
     * 从父级移除child
     * @param child
     */
    DisplayUtils.removeFromParent = function (child) {
        if (child.parent == null)
            return;
        child.parent.removeChild(child);
    };
    /**
     * 添加到指定容器
     * @param child
     * @param parent
     */
    DisplayUtils.addChild = function (child, parent) {
        if (!child || !parent)
            return;
        parent.addChild(child);
    };
    /**
     * 创建多边形
     */
    DisplayUtils.ceratePolygon = function (pts, x, y) {
        var shape = new egret.Shape();
        var pt;
        var l = pts.length;
        //开始连线
        shape.graphics.lineStyle(3, 0xFF0000);
        shape.graphics.beginFill(0x000000);
        for (var i = 1; i < l; i++) {
            pt = pts[i - 1];
            shape.graphics.moveTo(pt.x, pt.y);
            if (i != 1)
                egret.Point.release(pt);
            pt = pts[i];
            shape.graphics.lineTo(pt.x, pt.y);
        }
        //首尾闭合
        pt = pts[l - 1];
        shape.graphics.moveTo(pt.x, pt.y);
        egret.Point.release(pt);
        pt = pts[0];
        shape.graphics.lineTo(pt.x, pt.y);
        egret.Point.release(pt);
        shape.graphics.endFill();
        //锚点,位置
        shape.anchorOffsetX = shape.width >> 1;
        shape.anchorOffsetY = shape.height >> 1;
        shape.x = x;
        shape.y = y;
        return shape;
    };
    /**
     * egret.Point点集转换数组点集 [0][0],[0][1],[1][0]...
     * @param 点集
     * @param 是否转化成物理坐标
     * @param 物理世界高度
     */
    DisplayUtils.pointToArr = function (ePath, change, hi) {
        var path = [];
        var l = ePath.length;
        var p;
        for (var i = 0; i < l; i++) {
            if (change) {
                p = PhysicsUtils.epToPp(ePath[i].x, ePath[i].y, hi);
            }
            else {
                p = ePath[i];
            }
            path.push([p.x, p.y]);
            egret.Point.release(p);
        }
        return path;
    };
    return DisplayUtils;
}());
__reflect(DisplayUtils.prototype, "DisplayUtils");
