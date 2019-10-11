/**
 * 测试界面
 */
class TEST1View extends BaseEuiView{
    private world:p2.World;
    private bodys:Array<p2.Body>;
    private body:p2.Body; //引用
    private display:egret.DisplayObject; //引用
    private displays:Array<egret.DisplayObject>; //引用
    private h:number=800;
    private lastCall:number;
    constructor($controller:BaseController,$parent:egret.DisplayObjectContainer){
        super($controller,$parent);
        //this.skinName="resource/skins/testView1Skin.exml";
        this.width=App.getStageUtils().getWidth();
        this.height=App.getStageUtils().getHeight();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        //this.createGround();
        this.car();
    }
    private start(){
        for(let i=0;i<this.bodys.length;i++){
            console.log("刚体:"+"x"+this.bodys[i].position[0]+"y"+this.bodys[i].position[1]);
        }
        for(let i=0;i<this.displays.length;i++){
            console.log("物体:"+this.displays[i].hashCode+"x:"+this.displays[i].x+",y:"+this.displays[i].y)
            this.addChild(this.displays[i]);
        }
        this.world.on("postStep",this.mapping.bind(this));
        App.getFrameManager().creadFrameHander(this.add,this,1,-1);
    }
    /**车*/
    private car(){
        this.createWorld();
        this.displays=[];
        this.bodys=[];
        //高度
        let height:number=805;
        //地面
        let ground:eui.Rect=DisplayUtils.createRect(800,10,400,805,0x000000);
        this.displays.push(ground);
        ground.rotation=10;
        let panle:p2.Body=PhysicsUtils.createSimpleBox(p2.Body.wSTATIC,ground,this.world,height,0);
        //车轮
        let shape:egret.Shape=DisplayUtils.cerateCircle(50,0,250,0xFFFFFF,2);
        this.displays.push(shape);
        let wheelBody1:p2.Body=PhysicsUtils.createSimpleCircle(p2.Body.DYNAMIC,shape,this.world,height);
        shape=DisplayUtils.cerateCircle(50,200,250,0xFFFFFF,2);
        this.displays.push(shape);
        let wheelBody2:p2.Body=PhysicsUtils.createSimpleCircle(p2.Body.DYNAMIC,shape,this.world,height);
        //车身
        let rect:eui.Rect=DisplayUtils.createRect(200,200,100,100,0x7F4B4B);
        this.displays.push(rect);
        let chassisBody:p2.Body=PhysicsUtils.createSimpleBox(p2.Body.DYNAMIC,rect,this.world,height);
        //刚体加入物理世界
        this.bodys.push(panle);
        this.bodys.push(wheelBody1);
        this.bodys.push(wheelBody2);
        this.bodys.push(chassisBody);
        //创建车轮和车身的旋转约束(节点)
        let constraint1=new p2.RevoluteConstraint(chassisBody,wheelBody1,{
            localPivotA:[-2,-3],
            localPivotB:[0,0],
            collideConnected:false});
        let constraint2=new p2.RevoluteConstraint(chassisBody,wheelBody2,{
            localPivotA:[2,-3],
            localPivotB:[0,0],
            collideConnected:false});
        this.world.addConstraint(constraint1);
        this.world.addConstraint(constraint2);
        this.start();
    }
    /**物理世界前进,并且同步所有显示对象*/
    private add(){
        this.world.step(PhysicsUtils.frameTime);
    }
    private createWorld():void{
        let world:p2.World=new p2.World({gravity:[0,-9.8],islandSplit:true});
        this.world=world;
        world.sleepMode = p2.World.BODY_SLEEPING;
    }
    private onTap(){

    }
    private mapping(){
        let len:number=this.bodys.length;
        for(let i=0;i<len;i++){
            this.body=this.bodys[i];
            PhysicsUtils.mapping(this.body,this.h);
        }
    }
}