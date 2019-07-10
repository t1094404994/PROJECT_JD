/**
 * 窗口主控管理类
 */
class ViewManager extends SingtonClass{
    private _views:any;
    private _openViews:Array<number>;//打开窗口的
    constructor(){
        super();
        this._views={};
        this._openViews=[];
    }
    /**
     * 清理处理
     */
    public clear():void{
        this.closeAll();
        this._views={};
    }
    /**
     * 界面注册
     * @param key 标识
     * @param view 界面
     */
    public register(key:number,view:IBaseView):boolean{
        if(this._views[key]) return false;//已存在
        this._views[key]=view;
        return true;
    }
    /**
     * 解除界面注册
     * @param key 标识
     */
    public unregister(key:number):void{
        let view:IBaseView=this._views[key];
        if(!view) return;
        view=null;
        delete this._views[key];
    }
    /**
     * 销毁界面
     * @param key 标识 
     * @param newView 新界面
     */
    public destroy(key:number,newView:IBaseView=null):void{
        let oldView:IBaseView=this._views[key];
        if(oldView){
            oldView.destroy();
            oldView=null;
            delete this._views[key];
        }
        if(newView) this.register(key,newView);
    }
    /**
     * 打开窗口
     * @param key 标识
     * @param param 窗口参数
     */
    public open(key:number,...param:any[]):IBaseView{
        let view:IBaseView=this.getView(key);
        if(view==null){ //是否注册
            console.log("提前注册窗口界面")
            return;
        }
        if(view.isShow()){ //是否显示
            view.open(...param);
            return view;
        }
        if(view.isInit()){ //是否初始化
            view.addToParent();
            view.open(...param);
        }else{
            App.getEasyLoading().show();
            view.loadResource(App.getEasyLoading().setProgress,function(){
                view.setVisible(false);
                view.addToParent();
                App.getEasyLoading().hide();
            }.bind(this),function(){
                view.initUI();
                view.initData();
                view.setVisible(true);
                view.open(...param);
            }.bind(this));
        }
        this._openViews.push(key);
        return view;
    }
    /**
     * 关闭界面
     * @param key 标识
     */
    public close(key:number):boolean{
        let view:IBaseView=this.getView(key);
        if(!view) return false;//没有注册界面
        if(!this.isShow(key)) return false;//没有打开
        let index=this._openViews.indexOf(key);
        if(index>=0){
            this._openViews.splice(index,1);
        }
        view.removeFromParent();
        view.close();
        return true;
    }
    /**
     * 根据唯一标识获取一个UI对象
     * @param key 
     */
    public getView(key:number):IBaseView{
        return this._views[key];
    }
    /**
     * 关闭所有开启中的UI
     */
    public closeAll():void{
        let l:number=this._openViews.length;
        while(l--){
            this.close(this._openViews[0]);
        }
    }
    /**
     * 当前ui打开数量
     * @returns {number}
     */
    public currOpenNum(): number {
        return this._openViews.length;
    }

    /**
     * 检测一个UI是否开启中
     * @param key
     * @returns {boolean}
     */
    public isShow(key: number): boolean {
        return this._openViews.indexOf(key) != -1;
    }
}