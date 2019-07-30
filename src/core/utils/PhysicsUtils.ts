/**
 * P2物理引擎工具类
 * 1.egret坐标系和p2坐标系Y轴反转
 * 2.p2旋转采用弧度 
 */
class PhysicsUtils{
    public static readonly factor:number=50; //p2/egret坐标比例
    public static readonly v_radian:number=180; //PI
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
     * 创建一面物理墙
     * @param type 类型
     * @param world 物理world
     * @param display 
     * @param id p2body的ID
     * @param vx 速度 ()
     * @param sh 场景高度 
     * @param w 宽
     * @param h 高
     * @param x 位置
     * @param y 位置
     */
    public static createGround(type:number=0,world:p2.World,displays:Array<egret.DisplayObject>,id:number,vx:number,sh:number,w:number,h:number,x:number,y:number):p2.Body{
        let p:egret.Point=PhysicsUtils.epToPp(x,y,sh);
        let p2Body:p2.Body;
        if(type){
            p2Body=new p2.Body({position: [p.x,p.y],type:p2.Body.wSTATIC});
            //p2Body.angle=Math.PI;
        }else{
            p2Body=new p2.Body({mass: 1,position: [p.x,p.y], angularVelocity: 1});
        }
        p2Body.id=id;
        console.log("位置:"+p2Body.position);
        world.addBody(p2Body);
        let p2Rect:p2.Box=new p2.Box({width:PhysicsUtils.eVToPv(w),height:PhysicsUtils.eVToPv(h)});
        p2Body.addShape(p2Rect);
        p2Body.displays=displays;
        return p2Body;
    }
}