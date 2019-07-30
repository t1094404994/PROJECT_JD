class TEST1View extends BaseEuiView{
    private body1:p2.Body;
    private body2:p2.Body;
    private rect2:eui.Rect;
    private world:p2.World;
    private p:egret.Point;
    constructor($controller:BaseController,$parent:egret.DisplayObjectContainer){
        super($controller,$parent);
        //this.skinName="resource/skins/testView1Skin.exml";
        this.width=App.getStageUtils().getWidth();
        this.height=App.getStageUtils().getHeight();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        this.createGround();
    }
    //创建浮动跳板
    private createGround(){
        this.createWorld();
        let foolr:egret.DisplayObject=this.cerateRect(800,20,0,400);
        PhysicsUtils.createGround(1,this.world,[foolr],1001,1,800,foolr.width,foolr.height,foolr.x,foolr.y);
        this.addChild(foolr);
        this.rect2=this.cerateRect(50,40,275,200);
        this.body2=PhysicsUtils.createGround(0,this.world,[this.rect2],1002,1,800,this.rect2.width,this.rect2.height,this.rect2.x,this.rect2.y);
        this.body2.velocity[1]=0.1;
        this.addChild(this.rect2);
        App.getFrameManager().creadFrameHander(this.add,this,1,-1);
    }
    private add(){
        this.world.step(PhysicsUtils.frameTime);
        this.p=PhysicsUtils.ppToEp(this.body2.position[0],this.body2.position[1],800);
        this.rect2.x=this.p.x
        this.rect2.y=this.p.y;
        this.rect2.rotation=PhysicsUtils.prToEr(this.body2.angle);
    }
    //创建一个方块
    private cerateRect(w:number,h:number,x:number,y:number):eui.Rect{
        let rect:eui.Rect=new eui.Rect(w,h,0x000000);
        rect.anchorOffsetX=w>>1;
        rect.anchorOffsetY=h>>1;
        rect.x=x+w>>1;
        rect.y=y+h>>1;
        return rect;
    }
    
    private createWorld():void{
        let world:p2.World=new p2.World({gravity:[0,-9.81]});
        this.world=world;
        world.sleepMode = p2.World.BODY_SLEEPING;
    }
    private onTap(){

    }
}