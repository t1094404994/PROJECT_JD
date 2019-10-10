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
    return DisplayUtils;
}());
__reflect(DisplayUtils.prototype, "DisplayUtils");
