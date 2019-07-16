/**
 * 转圈加载
 */
class EasyLoading extends SingtonClass implements ILoadingUI{
    private container:egret.DisplayObjectContainer; //容器
    private loadImage:egret.Bitmap; //转圈图片
    public loadText:egret.TextField; //进度文字
    private callFun:Function;
    private hander:FrameHander;
    constructor(){
        super();
        this.init();
    }
    private init(){
        this.container=new egret.DisplayObjectContainer();
        this.loadText=new egret.TextField();
        this.loadText.size=23;
        this.loadText.textColor=0x000000;
        RES.getResByUrl("resource/assets/P_JiaZai_03.png",function(texture:egret.Texture){
            this.loadImage=new egret.Bitmap();
            this.loadImage.texture=texture;
            this.container.addChild(this.loadImage);
            App.getStageUtils().onCenter(this.container,this.loadImage,true);
            this.hander=App.getFrameManager().creadFrameHander(this.onFrame,this,1,-1,null,true);
        },this,RES.ResourceItem.TYPE_IMAGE);
        this.container.addChild(this.loadText);
        this.dispos();
    }
    /**
     * 帧转圈圈
     */
    public onFrame(v:number){
        this.loadImage.rotation+=6;
    }
    public removeFrame(){
        App.getFrameManager().removeHander(this.onFrame,this);
    }
    public loadSource(source:string[],callFun:Function){
        this.callFun=callFun;
        this.show();
        ResUtil.loadGroups(source,this.setProgress,null,this.loadComplete,this);
    }
    private loadComplete(data:GroupData):void{
        this.hide();
        this.callFun();
        this.callFun=null;
    }
    private dispos(){
        this.loadText.text=0+"%";
    }
    private onReSize(){
        App.getStageUtils().onCenter(this.container,this.loadText,false);
    }
    /**
     * 设置进度
     */
    setProgress(groupData:GroupData):void{
        this.loadText.text=String(groupData.getPercent())+"%";
    }
    /**
     * 显示loading
     */
    show():void{
        this.hander.freezed=false;
        App.getStageUtils().addToStage(this.container,true);
        App.getStageUtils().onCenter(this.container,this.loadText,false);
        this.loadText.addEventListener(egret.Event.RESIZE,this.onReSize,this);
    }
    /**
     * 隐藏loading
     */
    hide():void{
        this.hander.freezed=true;
        this.dispos();
        this.loadText.removeEventListener(egret.Event.RESIZE,this.onReSize,this);
        App.getStageUtils().removeFormStage(this.container);
    }
}