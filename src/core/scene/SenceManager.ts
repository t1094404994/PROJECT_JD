/**
 * 游戏场景管理类
 */
class SenceManager extends SingtonClass{
    private sences:Object; //保存场景
    private _currScene:number;//当前场景
    constructor(){
        super();
        this.sences={};
    }
    /**
     * 注册场景
     * @param key 场景标识
     * @param sence 场景
     */
    public register(key:number,sence:BaseSence){
        this.sences[key]=sence;
    }
    /**
     * 解除注册场景
     * @param key 标识
     */
    public unRegister(key:number){
        if(this.sences[key]){
            this.sences[key]=null;
            delete this.sences[key];
        } 
    }
    /**
     * 摧毁场景
     * @param key 场景标识 
     */
    public destroy(key:number){
        if(this.sences[key]){
            this.closeSence(key,true);
        }
    }
    /**
     * 打开一个场景层
     * @param key 场景标识
     * @param source  场景资源
     */
    public openSence(key:number,source?:string[],oldSence?:BaseSence):void{
        let sence:BaseSence=this.sences[key];
        if(!sence) return;
        sence.onEnter();
        App.getStageUtils().addToStage(sence);
        this._currScene=key;
    }
    /**
     * 切换场景
     * @param tokey 目标场景标识 
     */
    public changeSence(tokey:number,source?:string[]){
        let newSence:BaseSence=this.sences[tokey];
        if(!newSence) return;
        let oldSecne:BaseSence=this.sences[this._currScene];
        oldSecne.onExit();
        App.getStageUtils().removeFormStage(oldSecne);
        this.openSence(tokey,source,oldSecne);
    }
    /**
     * 关闭场景
     * @param key 场景标识 
     * @param force 是否销毁场景 
     */
    public closeSence(key:number,force:boolean){
        let sence:BaseSence=this.sences[key];
        if(!sence) return;
        this.unRegister(key);
        App.getStageUtils().removeFormStage(sence);
        sence.onExit(force);
    }
}