/**
 * 测试界面
 */
class TEST1View extends BaseEuiView{
    private world:p2.World;
    private bodys:Array<p2.Body>;
    private body:p2.Body; //引用
    private display:egret.DisplayObject; //引用
    private displays:Array<egret.DisplayObject>; //引用
    private h:number=900;
    //补帧
    private timeSinceLastCall:number;
    private times:number;
    constructor($controller:BaseController,$parent:egret.DisplayObjectContainer){
        super($controller,$parent);
        this.width=App.getStageUtils().getWidth();
        this.height=App.getStageUtils().getHeight();
        //this.polygon();
        this.addTrack();
    }
    private start(){
        for(let i=0;i<this.displays.length;i++){
            this.addChild(this.displays[i]);
        }
        this.world.on("postStep",this.mapping.bind(this));
        App.getFrameManager().creadFrameHander(this.add,this,1,-1);
    }
    /** 多边形*/
    private polygon():void{
        //初始化
        this.createWorld();
        this.displays=[];
        this.bodys=[];
        let display:egret.DisplayObject;
        let body:p2.Body;
        //时间高度
        let height:number=this.h;
        //创建背景
        let back:eui.Rect=DisplayUtils.createRect(1200,height,600,height/2,0xFFFFFF);
        this.displays.push(back);
        //创建底板
        let panle:eui.Rect=DisplayUtils.createRect(800,10,400,height);
        this.displays.push(panle);
        let panlebody:p2.Body=PhysicsUtils.createSimpleBox(p2.Body.wSTATIC,panle,this.world,height,0);
        this.bodys.push(panlebody);
        //多边形
        let plygon:Polygon=new Polygon();
        this.displays.push(plygon.onShape());
        let path:Array<Array<number>>
        let pts:Array<Array<number>>;
        let p:egret.Point;
        let complete:()=>void=function():void{
            //相对自身的位置
            path=plygon.getChangePath();
            p=plygon.getPoint();
            display=DisplayUtils.ceratePolygon(path,p.x,p.y);
            //父对象位置
            path=plygon.getPath();
            //物理世界的位置
            pts=DisplayUtils.pointToArr(path,height);
            body=PhysicsUtils.createConcave(p2.Body.DYNAMIC,display,this.world,height,1,pts);
            //创建物理多边形成功
            if(body!=null){
                this.displays.push(display);
                this.addChild(display);
                this.bodys.push(body);
            }
        }
        this.world.on("addBody",function(evt){
            evt.body.setDensity(1);
        });
        plygon.onEvt(this,true,complete);
        this.start();
    }
    private tarck:Track;
    /**
     * 添加一个追踪体
     */
    private addTrack(){
        let circle:egret.Shape=DisplayUtils.cerateCircle(50,200,200,2);
        let tarck:Track=new Track();
        tarck._displays=[circle];
        tarck.setPA([200,200]);
        this.tarck=tarck;
        this.displays=[circle];
        //高度
        let height:number=this.h;
        //创建背景
        let back:eui.Rect=DisplayUtils.createRect(1200,height,600,height/2,0xFFFFFF);
        this.displays.push(back);
        App.getFrameManager().creadFrameHander(this.onTrack,this,10,-1);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        this.addChild(back);this.addChild(circle);
    }
    /**驱动跟踪体*/
    private onTrack(){
        if(this.tarck.start){
            this.tarck.onStep(20);
            let circle=this.tarck._displays[0];
            circle.x=this.tarck.x;circle.y=this.tarck.y;
        }
    }
    private onTap(evt:egret.TouchEvent){
        this.tarck.reset();
        this.tarck.setPB([evt.localX,evt.localY]);
        this.tarck.start=true;
    }
    /**物理世界前进,并且同步所有显示对象*/
    private add(){
        if(this.timeSinceLastCall==undefined){
            this.timeSinceLastCall=Date.now()/1000;//单位秒
            this.world.step(PhysicsUtils.frameTime);
        }else{
            this.timeSinceLastCall=Date.now()/1000-this.timeSinceLastCall;
            //maxSubSteps 跳帧的最大步长,如果间隔超过单位时间*步长,就会失速 如果最大步长太大,间隔太久,容易造成顿卡
            this.world.step(PhysicsUtils.frameTime,this.timeSinceLastCall,10);
            this.timeSinceLastCall=Date.now()/1000;
        }
    }
    private createWorld():void{
        let world:p2.World=new p2.World({gravity:[0,-9.8],islandSplit:true});
        this.world=world;
        world.sleepMode = p2.World.BODY_SLEEPING;
    }
    private mapping(){
        let len:number=this.bodys.length;
        for(let i=0;i<len;i++){
            this.body=this.bodys[i];
            PhysicsUtils.mapping(this.body,this.h);
        }
    }
}