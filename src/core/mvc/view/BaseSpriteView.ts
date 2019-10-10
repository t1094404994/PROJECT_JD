/**
 * 普通view类,没皮肤
 */
class BaseSpriteView extends egret.DisplayObjectContainer implements IBaseView{
    private _controller:BaseController;
    private _myPrent:egret.DisplayObjectContainer;
    private _isInit:boolean;
    private _resoures:string[]=null;
    constructor(){
        super();
    }
    /**
     * 是否已经初始化
     * @returns {boolean}
     */
    public isInit():boolean{
        return this._isInit;
    }

    /**
     * 面板是否显示
     * @return
     *
     */
    public isShow():boolean{
        return this.stage!=null&&this.visible;
    }

    /**
     * 添加到父级
     */
    public addToParent():void{
        this._myPrent.addChild(this);
    }

    /**
     * 从父级移除
     */
    public removeFromParent():void{
        DisplayUtils.removeFromParent(this);
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI():void{
        this._isInit=true;
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData():void{

    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param:any[]):void{

    }

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    public close(...param:any[]):void{

    }

    /**
     * 销毁
     */
    public destroy():void{
        this._controller=null;
        this._myPrent=null;
        this._resoures=null;
    }

    /**
     * 触发本模块消息
     * @param key 唯一标识
     * @param param 参数
     *
     */
    public applyFunc(key:any, ...param:any[]):any{
        return this._controller.applyFunc.apply(this._controller, arguments);
    }

    /**
     * 触发其他模块消息
     * @param controllerKey 模块标识
     * @param key 唯一标识
     * @param param 所需参数
     *
     */
    public applyControllerFunc(controllerKey:number, key:any, ...param:any[]):any{
        return this._controller.applyControllerFunc.apply(this._controller, arguments);
    }

    /**
     * 设置是否隐藏
     * @param value
     */
    public setVisible(value:boolean):void{
        this.visible=value;
    }

    /**
     * 设置初始加载资源
     * @param resources
     */
    public setResources(resources:string[]):void{
        this._resoures=resources;
    }

    /**
     * 分模块加载资源
     */
    public loadResource(loadComplete:(groupData:GroupData)=>void, initComplete:Function):void{
        if(this._resoures&&this._resoures.length>0){
            ResUtil.loadGroups(this._resoures,null,null,loadComplete,this);
            this.once(eui.UIEvent.CREATION_COMPLETE,initComplete,this);
        }else{
            loadComplete(null);
            initComplete();
        }
    }
}