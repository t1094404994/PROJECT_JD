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
    public static checkPolygon(path:Array<Array<number>>):boolean{
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
    public static segmentsIntersect(a1:Array<number>,a2:Array<number>,b1:Array<number>,b2:Array<number>):boolean{
        let dx:number = a2[0] - a1[0];
        let dy:number = a2[1] - a1[1];
        let da:number = b2[0] - b1[0];
        let db:number = b2[1] - b1[1];
        // 平行或同一条线
        if(da*dy - db*dx == 0) return false;
        //?
        var s = (dx * (b1[1] - a1[1]) + dy * (a1[0] - b1[0])) / (da * dy - db * dx)
        var t = (da * (a1[1] - b1[1]) + db * (b1[0] - a1[0])) / (db * dx - da * dy)

        return (s>=0 && s<=1 && t>=0 && t<=1);
        // //两条线段所在直线的交点的xy值
        // let x:number=(da*(a1.x*dy-a1.y*dx)+dx*(b1.y*da-b1.x*db))/(dy*da-db*dx);
        // let y:number;
        // if(dx){
        //     y=x*dy/dx+a1.y/2+a2.y/2-(a1.x+a2.x)*dy/dx/2;
        // }else{
        //     y=x*db/da+b1.y/2+b2.y/2-(b1.x+b2.x)*db/da/2;
        // }
        // //xy的范围
        // let onxa:boolean=(a2.x<=x&&x<=a1.x)||(a1.x<=x&&x<=a2.x);
        // let onxb:boolean=(b2.x<=x&&x<=b1.x)||(b1.x<=x&&x<=b2.x);
        // let onya:boolean=(a2.y<=y&&y<=a1.y)||(a1.y<=y&&y<=a2.y);
        // let onyb:boolean=(b2.y<=y&&y<=b1.y)||(b1.y<=y&&y<=b2.y);
        // //同时在两条上才相交
        // return onxa&&onxb&&onya&&onyb;
    }
    /**
     * 删除线段之间共线的点
     * @param path 点集
     * @param angle 弧度阈值 如果邻接线段之间的弧度小于阈值,则视为一条直线
     */
    public static removeCollinearPoints(path:Array<Array<number>>,angle:number=0):Array<Array<number>>{
        let pB:Array<number>;let pA:Array<number>;let pC:Array<number>;
        let l:number=path.length;
        for(let i=2;i<l;i++){
            pB=path[i-2];pA=path[i-1];pC=path[i];
            //边长
            let a:number=Math.sqrt((pB[1]-pC[1])*(pB[1]-pC[1])+(pB[0]-pC[0])*(pB[0]-pC[0]));
            let b:number=Math.sqrt((pA[1]-pC[1])*(pA[1]-pC[1])+(pA[0]-pC[0])*(pA[0]-pC[0]));
            let c:number=Math.sqrt((pB[1]-pA[1])*(pB[1]-pA[1])+(pB[0]-pA[0])*(pB[0]-pA[0]));
            //余弦定理
            let cosA:number=(b*b+c*c-a*a)/(2*b*c);
            let lineAngle:number=Math.acos(cosA);
            let change:number=Math.abs(Math.PI-lineAngle);
            if(change<=angle){ //不超过阈值,视为一条直线
                  path.splice(i-1,1);l--;i--;
            }
        }
        return path;
    }
}