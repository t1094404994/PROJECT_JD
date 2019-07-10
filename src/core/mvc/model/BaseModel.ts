/**
 * 视图数据类
 */
class BaseModel{
    protected _controller:BaseController;
    /**
     * 构造
     * @param $controller 视图控制类
     */
    constructor($controller:BaseController){
        this._controller=$controller;
        this._controller.setModel(this);
    }
}
