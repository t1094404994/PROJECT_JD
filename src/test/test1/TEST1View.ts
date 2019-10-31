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
        //this.createGround();
        //this.car();
        //this.circles();
        this.polygon();
    }
    private start(){
        // for(let i=0;i<this.bodys.length;i++){
        //     console.log("刚体:"+"x"+this.bodys[i].position[0]+"y"+this.bodys[i].position[1]);
        // }
        for(let i=0;i<this.displays.length;i++){
            //console.log("物体:"+this.displays[i].hashCode+"x:"+this.displays[i].x+",y:"+this.displays[i].y)
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
    //40*40框 宽高800  从300-1100 半径10 xy随机20*
    private circles(){
        //初始化
        this.createWorld();
        this.displays=[];
        this.bodys=[];
        //世界高度
        let height:number=1100;
        //创建一个底板
        let panle:eui.Rect=DisplayUtils.createRect(800,10,400,1100);
        this.displays.push(panle);
        let panlebody:p2.Body=PhysicsUtils.createSimpleBox(p2.Body.wSTATIC,panle,this.world,height,0);
        this.bodys.push(panlebody);
        //创造20*20个圆
        let N:number=20;
        let S:number=40;
        let MinY:number=300;
        let MinX:number=0;
        let circle:egret.Shape;
        let body:p2.Body;
        let X:number;
        let Y:number;
        let color:number;
        let max:number=0xFFFFFF;
        for(let i=0;i<N;i++){
            for(let j=0;j<N;j++){
                X=MinX+S*j+N+N*Math.random();
                Y=MinY+S*i+N+N*Math.random();
                color=Math.random()*max;
                circle=DisplayUtils.cerateCircle(N>>1,X,Y,color,0);
                this.displays.push(circle);
                body=PhysicsUtils.createSimpleCircle(p2.Body.DYNAMIC,circle,this.world,height);
                this.bodys.push(body);
            }
        }
        //设置对象池 增加运行效率
        // Pre-fill object pools. Completely optional but good for performance!
        this.world.overlapKeeper.recordPool.resize(16);
        this.world.narrowphase.contactEquationPool.resize(1024);
        this.world.narrowphase.frictionEquationPool.resize(1024);
        // Set stiffness of all contacts and constraints
        this.world.setGlobalStiffness(1e8);
        let solver:p2.GSSolver=new p2.GSSolver();
        this.world.solver=solver;
        // Max number of solver iterations to do
        solver.iterations = 20;
        // Solver error tolerance
        solver.tolerance = 0.02;
        // Enables sleeping of bodies
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.start();
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
        let height:number=1200;
        //创建背景
        let back:eui.Rect=DisplayUtils.createRect(1200,800,600,400,0xFFFFFF);
        this.displays.push(back);
        //创建底板
        let panle:eui.Rect=DisplayUtils.createRect(800,10,400,1200);
        this.displays.push(panle);
        let panlebody:p2.Body=PhysicsUtils.createSimpleBox(p2.Body.wSTATIC,panle,this.world,height,0);
        this.bodys.push(panlebody);
        //多边形
        let plygon:Polygon=new Polygon();
        this.displays.push(plygon.onShape());
        let path:egret.Point[];
        let pts:Array<Array<number>>;
        let p:egret.Point;
        let complete:()=>void=function():void{
            path=plygon.getPath();
            p=plygon.getPoint();
            display=DisplayUtils.ceratePolygon(path,p.x,p.y);
            pts=DisplayUtils.pointToArr(path,true,height);
            body=PhysicsUtils.createConcave(p2.Body.KINEMATIC,display,this.world,height,1,pts);
            this.displays.push(display);
            this.addChild(display);
            //测试
            //this.bodys.push(body);
        }    
        plygon.onEvt(this,true,complete);
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
    private mapping(){
        let len:number=this.bodys.length;
        for(let i=0;i<len;i++){
            this.body=this.bodys[i];
            PhysicsUtils.mapping(this.body,this.h);
        }
    }
}