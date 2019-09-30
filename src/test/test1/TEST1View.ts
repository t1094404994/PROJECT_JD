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
        for(let i=0;i<this.displays.length;i++){
            this.addChild(this.displays[i]);
        }
        this.world.on("postStep",this.mapping.bind(this));
        App.getFrameManager().creadFrameHander(this.add,this,1,-1);
    }
    private createGround(){
        this.createWorld();
        this.displays=[];
        this.bodys=[];
        this.display=this.cerateRect(800,10,0,800);
        this.body=PhysicsUtils.createGround(1,this.world,[this.display],1,this.h,this.display.width,this.display.height,this.display.x,this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        let vmaterial:p2.Material=new p2.Material(103);
        this.body.shapes[0].material=vmaterial;
        this.display=this.cerateRect(50,50,400,100);
        this.body=PhysicsUtils.createGround(0,this.world,[this.display],1,this.h,this.display.width,this.display.height,this.display.x,this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        this.body.mass=2;
        let ice:p2.Material=new p2.Material(101);
        this.body.shapes[0].material=ice;
        this.display=this.cerateRect(50,50,300,100);
        this.body=PhysicsUtils.createGround(0,this.world,[this.display],1,this.h,this.display.width,this.display.height,this.display.x,this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        let steel:p2.Material=new p2.Material(102);//材料
        this.body.shapes[0].material=steel; //设置材料
        let contactMaterial=new p2.ContactMaterial(ice,steel,<p2.ContactMaterialOptions>{friction:0.03}); //设置两个材料的接触
        let contactMaterial2=new p2.ContactMaterial(ice,vmaterial,<p2.ContactMaterialOptions>{friction:0.05});
        let contactMaterial3=new p2.ContactMaterial(steel,vmaterial,<p2.ContactMaterialOptions>{friction:0.3});
        this.world.addContactMaterial(contactMaterial); //应用到世界里
        this.world.addContactMaterial(contactMaterial2);
        this.world.addContactMaterial(contactMaterial3);
        for(let i=0;i<this.displays.length;i++){
            this.addChild(this.displays[i]);
        }
        this.world.on("postStep",function(){
            let len:number=this.bodys.length;
            for(let i=0;i<len;i++){
                this.body=this.bodys[i];
                PhysicsUtils.mapping(this.body,this.h);
            }
        }.bind(this));
        //求解器 解决一个线性方程组的运算法则 ,它处理着约束，接触，摩擦。
        //GSSolver求解器是最稳定的
        // let solver:p2.GSSolver=new p2.GSSolver();
        // this.world.solver=solver;
        // solver.tolerance=0.01;
        // solver.equations[0].stiffness=0x1e8;
        // equation.relaxation = 4;
        // equation.updateSpookParams(timeStep);
        // p2.RevoluteConstraint()
        //设置重复次数 越多就越精确
        //solver.iterations=50;
        App.getFrameManager().creadFrameHander(this.add,this,1,-1);
    }
    /**车*/
    private car(){
        this.createWorld();
        this.displays=[];
        this.bodys=[];
        //地面
        this.display=this.cerateRect(800,10,0,800);
        this.body=PhysicsUtils.createGround(1,this.world,[this.display],1,this.h,this.display.width,this.display.height,this.display.x,this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        // Create chassis for our car 底盘
        this.display=this.cerateRect(300,100,300,300);
        this.body=PhysicsUtils.createGround(0,this.world,[this.display],0,800,this.display.width,this.display.height,this.display.x,this.display.y);
        this.displays.push(this.display);
        this.bodys.push(this.body);
        // Create wheels 轮子
        this.display=this.cerateCircle(30,300,500,0xFFE054);
        let p:egret.Point=PhysicsUtils.epToPp(300,500,800);
        let wheelsBody:p2.Body=new p2.Body({mass: 0.2,position: [p.x,p.y],type:p2.Body.DYNAMIC});
        let wheelsPanle:p2.Circle=new p2.Circle({radius:PhysicsUtils.eVToPv(30)});
        wheelsBody.displays=[this.display];
        wheelsBody.addShape(wheelsPanle);
        this.displays.push(this.display);
        this.bodys.push(wheelsBody);
        this.world.addBody(wheelsBody);
        this.display=this.cerateCircle(30,600,500,0xFFE054);
        p=PhysicsUtils.epToPp(600,500,800);
        wheelsBody=new p2.Body({mass: 0.2,position: [p.x,p.y],type:p2.Body.DYNAMIC});
        wheelsPanle=new p2.Circle({radius:PhysicsUtils.eVToPv(30)});
        wheelsBody.displays=[this.display];
        wheelsBody.addShape(wheelsPanle);
        this.displays.push(this.display);
        this.bodys.push(wheelsBody);
        this.world.addBody(wheelsBody);
        this.start();
    }
    /**物理世界前进,并且同步所有显示对象*/
    private add(){
        this.world.step(PhysicsUtils.frameTime);
    }
    //创建一个方块
    private cerateRect(w:number,h:number,x:number,y:number,color:number=0x000000):eui.Rect{
        let rect:eui.Rect=new eui.Rect(w,h,color);
        rect.anchorOffsetX=w>>1;
        rect.anchorOffsetY=h>>1;
        rect.x=x+(w>>1);
        rect.y=y+(h>>1);
        return rect;
    }
    //创建一个圆
    private cerateCircle(r:number,x:number,y:number,color:number=0x0000000):egret.Shape{
        let shape:egret.Shape=new egret.Shape();
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(x+r,y+r,r);
        shape.graphics.endFill();
        shape.anchorOffsetX=r;
        shape.anchorOffsetY=r;
        return shape;
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