/**
 * 转圈加载
 */
class EasyLoading extends SingtonClass implements ILoadingUI{
    private container:egret.DisplayObjectContainer; //容器
    private loadImage:egret.Bitmap; //转圈图片
    public loadText:egret.TextField; //进度文字
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
            this.loadImage.x=this.loadImage.anchorOffsetX=this.loadImage.width/2;
            this.loadImage.x=this.loadImage.anchorOffsetY=this.loadImage.height/2;
            this.container.addChild(this.loadImage);
            App.getFrameManager().creadFrameHander(this.onFrame,this,1,-1);
        },this,RES.ResourceItem.TYPE_IMAGE);
        this.container.addChild(this.loadText);
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
    /**
     * 设置进度
     */
    setProgress(groupData:GroupData):void{
        App.getEasyLoading().loadText.text=String(groupData.getPercent())+"%";
    }
    /**
     * 显示loading
     */
    show():void{
        App.getStageUtils().addToStage(this.container,true);
    }
    /**
     * 隐藏loading
     */
    hide():void{
        App.getStageUtils().removeFormStage(this.container);
    }
}