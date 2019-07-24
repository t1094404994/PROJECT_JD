/**
 * P2物理引擎工具类
 * 1.egret坐标系和p2坐标系Y轴反转
 * 2.p2旋转采用弧度 
 */
class PhysicsUtils{
    public static readonly factor:number=50;
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
     * p2坐标转
     * @param x 位置
     * @param y 位置
     * @param h 场景高度
     */
    public static PpToEp(x:number,y:number,h:number):egret.Point{
        return egret.Point.create(x*PhysicsUtils.factor,h-y*PhysicsUtils.factor);
    }
}