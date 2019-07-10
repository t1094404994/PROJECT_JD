var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 视图数据类
 */
var BaseModel = (function () {
    /**
     * 构造
     * @param $controller 视图控制类
     */
    function BaseModel($controller) {
        this._controller = $controller;
        this._controller.setModel(this);
    }
    return BaseModel;
}());
__reflect(BaseModel.prototype, "BaseModel");
