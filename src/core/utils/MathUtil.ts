/**
 * 数学工具类
 */
class MathUtil{
    constructor(){}
    /**
     * 按位或
     * @param numbers 
     */
    public static Bitwise_Or(...numbers):number{
        let len:number=numbers.length;
        let num:number=numbers[0];
        for(let i=1;i<len;i++){
            num=num|numbers[i];
        }
        return num;
    }

    /**
     * 检查输入的坐标向量能否构成一个闭合图形
     */
    public static checkPolygon(path:egret.Point[]):boolean{
        let l:number=path.length;
        //至少三点
        if(l<3) return false;
        //检查除了首尾相连的线段以为所有线段组合是否相交(相邻的线段也不检查) 指数复杂度
        for(let i=l-1;i>=1;i--){
            for(let k=i-2;k>=1;k--){
                if(MathUtil.segmentsIntersect(path[i],path[i-1],path[k],path[k-1])) return false;
            }
        }
        //检查首尾相连线段和其他线段是否相交
        for(let i=(l-3);i>=2;i--){
            if(MathUtil.segmentsIntersect(path[0],path[l-1],path[i],path[i-1])) return false;
        }
        return true;
    }
    /**
     * 检查线段a和线段b是否相交
     * @param a1 
     * @param a2 
     * @param b1 
     * @param b2 
     */
    public static segmentsIntersect(a1:egret.Point,a2:egret.Point,b1:egret.Point,b2:egret.Point):boolean{
        let dx:number = a2.x - a1.x;
        let dy:number = a2.y - a1.y;
        let da:number = b2.x - b1.x;
        let db:number = b2.y - b1.y;
        // 平行或同一条线
        if(da*dy - db*dx == 0) return false;
        // var s = (dx * (b1.y - a1.y) + dy * (a1.x - b1.x)) / (da * dy - db * dx)
        // var t = (da * (a1.y - b1.y) + db * (b1.x - a1.x)) / (db * dx - da * dy)

        // return (s>=0 && s<=1 && t>=0 && t<=1);
        //两条线段所在直线的交点的xy值
        let x:number=(da*(a1.x*dy-a1.y*dx)+dx*(b1.y*da-b1.x*db))/(dy*da-db*dx);
        let y:number=x*dy/dx+a1.y/2+a2.y/2-(a1.x+a2.x)*dy/dx/2;
        //xy的范围
        let onxa:boolean=(a2.x<=x&&x<=a1.x)||(a1.x<=x&&x<=a2.x);
        let onxb:boolean=(b2.x<=x&&x<=b1.x)||(b1.x<=x&&x<=b2.x);
        let onya:boolean=(a2.y<=y&&y<=a1.y)||(a1.y<=y&&y<=a2.y);
        let onyb:boolean=(b2.y<=y&&y<=b1.y)||(b1.y<=y&&y<=b2.y);
        //同时在两条上才相交
        return onxa&&onxb&&onya&&onyb;
    }
}