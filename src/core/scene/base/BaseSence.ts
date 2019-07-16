/**
 * 游戏场景类
 */
class BaseSence extends egret.DisplayObjectContainer{
    //当前场景所有Layer
    private _layers:Array<egret.DisplayObjectContainer>;
    private _isInit:boolean;
    private _srouce:string[]=null;
    public constructor(){
        super();
        this._layers=new Array<egret.DisplayObjectContainer>();
        this._isInit=false;
    }
    /**
     * 进入场景调用
     */
    public onEnter():void{
        
    }
    public setSource(source:string[]):void{
        this._srouce=source;
    }
    /**
     * 退出场景调用
     */
    public onExit(force?:boolean):void{
        App.getViewManger().closeAll();
        this.removeAllLayer();
        if(force) this.destroy();
    }
    /**
     * 销毁场景
     */
    protected destroy():void{

    }
    /**
     * 资源是否加载
     */
    public isInit():boolean{
        return this._isInit;
    }
    /**
     * 加载完成
     * @param bool 
     */
    public setInit(bool:boolean):void{
        this._isInit=bool;
    }
    /**
     * 添加一个Layer到场景
     * @param layer 
     */
    public addLayer(layer:egret.DisplayObjectContainer,index?:number):void{
        this.addChild(layer);
        this._layers.push(layer);
    }
    /**
     * 在舞台移除一个Layer
     * @param layer
     */
    public removeLayer(layer: egret.DisplayObjectContainer): void {
        this.removeChild(layer);
        this._layers.splice(this._layers.indexOf(layer), 1);//TODO 复杂度高
    }
    /**
     * Layer中移除所有
     * @param layer
     */
    public layerRemoveAllChild(layer: egret.DisplayObjectContainer): void {
        layer.removeChildren();
    }
    /**
     * 移除所有Layer
     */
    public removeAllLayer(): void {
        while (this._layers.length) {
            var layer: egret.DisplayObjectContainer =this._layers.pop();
            this.removeChild(layer);
            this.layerRemoveAllChild(layer);
        }
    }
    /**
     * 加载资源组
     * @param source 
     */
    // public loadResource(loadProGress:(data:GroupData)=>void,loadComplete:(data:GroupData)=>void, initComplete:Function){
    //     if (this._srouce && this._srouce.length > 0) {
    //         ResUtil.loadGroups(this._srouce,loadProGress,null,loadComplete,this);
    //         this.once(eui.UIEvent.CREATION_COMPLETE, initComplete, this);
    //     }
    //     else {
    //         loadComplete(null);
    //         initComplete();
    //     }
    // }
}