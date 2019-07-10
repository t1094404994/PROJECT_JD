/**
 * controller的主控管理类
 */
class ControllerManager extends SingtonClass{
    private _modules:any;//保存控制器
    constructor(){
        super();
        this._modules={};
    }
    /**
     * 清空处理
     */
    public clear():void{
        this._modules={};
    }
    /**
     * 注册控制器
     * @param key 控制器标识
     * @param control 控制器
     * @param replace 如果已经存在,是否替换
     */
    public register(key:number,control:BaseController,replace:boolean=false):void{
        if(this._modules[key]&&!replace) return;
        this._modules[key]=control;
    }

    /**
     * 解除控制器
     * @param key 控制器标识
     */
    public unrgister(key:number):void{
        if(!this._modules[key]) return;
        this._modules[key]=null;
        delete this._modules[key];
    }
    /**
     * 跨模块消息传递
     * @param controlerD 控制器标识
     * @param key 消息标识
     * @param param 参数
     */
    public applyFunc(controlerD:number,key:number,...param:any[]):any{
        let controler:BaseController=this._modules[controlerD];
        if(controler){
            return controler.applyFunc(key,param);
        }else{
            console.log("模块"+controlerD+"不存在");
            return null;
        }
    }
    /**
     * 获取指定Controller的Model对象
     * @param controllerD Controller唯一标识
     * @returns {BaseModel}
     */
    public getControllerModel(controllerD: number): BaseModel {
        var manager: BaseController = this._modules[controllerD];
        if (manager) {
            return manager.getModel();
        }
        return null;
    }
}