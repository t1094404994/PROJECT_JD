/**
 * P2物理引擎工具类
 * 1.egret坐标系和p2坐标系Y轴反转
 * 2.p2旋转采用弧度 
 * 3.meters-kilogram-second 米-千克-秒 p2物理引擎中使用的基本单位 这里设1米=50px
 */
class PhysicsUtils{
    public static readonly factor:number=50; //p2/egret坐标比例
    public static readonly v_radian:number=180; //PI对应的角度
    public static readonly frameTime:number=1/60;//1帧的时间s(对于60f/s)
    constructor(){}

    /**
     * egret坐标转p2
     * @param x 位置
     * @param y 位置
     * @param h 场景高度
     */
    public static epToPp(x:number,y:number,h:number):egret.Point{
        return egret.Point.create(x/PhysicsUtils.factor,(h-y)/PhysicsUtils.factor);
    }

    /**
     * p2坐标转egret坐标
     * @param x 位置
     * @param y 位置
     * @param h 场景高度
     */
    public static ppToEp(x:number,y:number,h:number):egret.Point{
        return egret.Point.create(x*PhysicsUtils.factor,h-y*PhysicsUtils.factor);
    }

    /**
     * egret角度转p2弧度
     * @param angle 角度
     */
    public static eRToPr(angle:number):number{
        return (360-angle)*Math.PI/PhysicsUtils.v_radian;
    }

    /**
     * p2弧度转角度
     * 起点不一样所有要减差
     * @param radian 
     */
    public static prToEr(radian:number):number{
        return 360-radian*PhysicsUtils.v_radian/Math.PI;
    }

    /**
     * egret显示对象数值转换成p2显示数值
     * @param v 数值
     */
    public static eVToPv(v:number):number{
        return v/PhysicsUtils.factor;
    }

    /**
     * 根据对应法则,同步body中的所有显示对象
     * @param body 
     */
    public static mapping(body:p2.Body,h:number):void{
        let display:egret.DisplayObject;
        let displays:Array<egret.DisplayObject>=body.displays;
        let len:number=displays.length;
        for(let i=0;i<len;i++){
            display=displays[i];
            PhysicsUtils.mappingDisplay(display,body,h);
        }
    }

    /**
     * 根据对应法则,同步body中的一个显示对象
     * @param display 显示对象
     * @param body p2物理对象
     * @param h 高度
     * @param interPolate 是否使用插值,一般是有跳帧的时候使用,显示会更流畅
     */
    public static mappingDisplay(display:egret.DisplayObject,body:p2.Body,h:number,interPolate?:boolean):void{
        let p:egret.Point;
        let angle:number;
        if(!interPolate){
            p=PhysicsUtils.ppToEp(body.position[0],body.position[1],h);
            angle=PhysicsUtils.prToEr(body.angle);
        } 
        else{
            p=PhysicsUtils.ppToEp(body.interpolatedPosition[0],body.interpolatedPosition[1],h);
            angle=PhysicsUtils.prToEr(body.interpolatedAngle);
        } 
        display.x=p.x;
        display.y=p.y;
        display.rotation=angle;
        egret.Point.release(p);
    }

    /**
     * 设置碰撞码
     * @param mask 可以碰撞的分组(二进制位1),取反则表示不可以碰撞的分组.因为是互异的,所以只能设置一种
     * @param notMask 取反
     *源码中检查能否碰撞 因为是位操作,所以最好每个分组都是二进制数的一位(2^n n是自然数)
     //if(shapeA.collisionGroup & shapeB.collisionMask)!=0 && (shapeB.collisionGroup & shapeA.collisionMask)!=0){
        // The shapes can collide
     //}
     */
    public static setCollisionMask(shape:p2.Shape,mask:number,notMask?:boolean){
        if(notMask) mask=~mask;
        shape.collisionMask=mask;
    }

    /**
     * 创建一面物理墙
     * @param type 类型 1:静态 2：
     * @param world 物理world
     * @param display 
     * @param vx 速度 ()
     * @param sh 场景高度 
     * @param w 宽
     * @param h 高
     * @param x 位置
     * @param y 位置
     */
    public static createGround(type:number=0,world:p2.World,displays:Array<egret.DisplayObject>,vx:number,sh:number,w:number,h:number,x:number,y:number):p2.Body{
        let p:egret.Point=PhysicsUtils.epToPp(x,y,sh);
        let p2Body:p2.Body;
        if(type){
            p2Body=new p2.Body({position: [p.x,p.y],type:p2.Body.wSTATIC});
        }else{
            p2Body=new p2.Body({mass: 1,position: [p.x,p.y],type:p2.Body.DYNAMIC,angularVelocity: 1});
        }
        console.log("位置:"+p2Body.position);
        world.addBody(p2Body);
        let p2Rect:p2.Box=new p2.Box({width:PhysicsUtils.eVToPv(w),height:PhysicsUtils.eVToPv(h)});
        p2Body.addShape(p2Rect);
        p2Body.displays=displays;
        egret.Point.release(p);
        return p2Body;
    }
    /**
     * 创建一个方形刚体,使物理和显示对象绑定
     * @param bodyType 刚体类型
     * @param world 世界
     * @param wh 父级高度
     */
    public static createSimpleBox(bodyType:number,display:egret.DisplayObject,world:p2.World,wh:number,mass:number=1):p2.Body{
        let p:egret.Point=PhysicsUtils.epToPp(display.x,display.y,wh);
        let p2Body:p2.Body=new p2.Body({position:[p.x,p.y],type:bodyType,mass:mass,angle:PhysicsUtils.eRToPr(display.rotation)});
        let p2Box:p2.Plane=new p2.Box({width:PhysicsUtils.eVToPv(display.width),height:PhysicsUtils.eVToPv(display.height)});
        p2Body.addShape(p2Box);
        p2Body.displays=[display];
        world.addBody(p2Body);
        egret.Point.release(p);
        return p2Body;
    }
    /**
     * 创建一个圆形刚体,使物理和显示对象绑定
     * @param bodyType 刚体类型
     * @param world 世界
     * @param wh 父级高度
     */
    public static createSimpleCircle(bodyType:number,display:egret.DisplayObject,world:p2.World,wh:number,mass:number=1):p2.Body{
        let p:egret.Point=PhysicsUtils.epToPp(display.x,display.y,wh);
        let p2Body:p2.Body=new p2.Body({position:[p.x,p.y],type:bodyType,mass:mass,angle:PhysicsUtils.eRToPr(display.rotation)});
        let p2Box:p2.Circle=new p2.Circle({radius:PhysicsUtils.eVToPv(display.width>>1)});
        p2Body.angle=PhysicsUtils.eRToPr(display.rotation);
        p2Body.addShape(p2Box);
        p2Body.displays=[display];
        world.addBody(p2Body);
        egret.Point.release(p);
        return p2Body;
    }
}