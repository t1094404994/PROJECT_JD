class StageUtils extends SingtonClass{
    private readonly stage:egret.Stage=egret.MainContext.instance.stage;
    constructor(){
        super();
    }
    /**
     * 获取舞台的高度
     */
    public getHeight():number{
        return this.stage.stageHeight;
    }
    /**
     * 获取游戏宽度
     */
    public getWidth():number{
        return this.stage.stageWidth;
    }
    /**
     * 指定此对象的子项以及子孙项是否接收鼠标/触摸事件
     * @param value
     */
    public setTouchChildren(value: boolean): void {
        this.stage.touchChildren = value;
    }
    /**
     * 设置同时可触发几个点击事件
     * @param value 
     */
    public setMaxTouches(value:number):void{
        this.stage.maxTouches=value;
    }
    /**
     * 设置适配方式
     * @param value
     */
    public setScaleMode(value: string): void {
        this.stage.scaleMode = value;
    }
    /**
     * 开启屏幕自适应
     */
    public openUIResize():void{
        this.stage.addEventListener(egret.Event.RESIZE,this.onUIResize,this);
        this.onUIResize();
    }
    private onUIResize():void{
        this.setResolutionRate();
    }
    /**
     * 屏幕尺寸改变调用,自适应
     */
    private setResolutionRate():void{
        this.stage.orientation=egret.OrientationMode.AUTO;
        if(this.stage.stageHeight*16>=this.stage.stageWidth*9){ //高度更高
            this.stage.scaleMode=egret.StageScaleMode.FIXED_WIDTH; //所以宽度不变
        }else{
            this.stage.scaleMode=egret.StageScaleMode.FIXED_HEIGHT;
        }
    }
    /**
     * 将显示对象添加到舞台上
     * @param view 
     */
    public addToStage(view:egret.DisplayObject,center?:boolean,index?:number){
        this.stage.addChild(view);
        if(center){
            this.onCenter(this.stage,view,false);
        }
    }
    /**
     * 将显示对象移除舞台
     * @param view 
     */
    public removeFormStage(view:egret.DisplayObject){
        this.stage.removeChild(view);
    }

    public initwh(){
        this.stage.width=900;
        this.stage.height=1600;
    }
    /**
     * 将显示对象居中(相对于父容器)
     * @param parent 父容器
     * @param object 对象
     * @param offset 是否通过偏移锚点达到效果,一般在对象需要旋转时设置 
     */
    public onCenter(parent:egret.DisplayObjectContainer,object:egret.DisplayObject,offset:boolean=false){
        object.x=parent.width>>1;
        object.y=parent.height>>1;
        let lx:number=object.width>>1;
        let ly:number=object.height>>1;
        if(offset){
            object.anchorOffsetX=lx;
            object.anchorOffsetY=ly;
        }else{
            object.x-=lx;
            object.y-=ly;
        }
    }  
}