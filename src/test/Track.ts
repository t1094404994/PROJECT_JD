/**跟踪目标*/
class Track{
    //显示对象 只引用,不操作
    public _displays:Array<egret.DisplayObject>;
    //当前步
    private _stepTime:number;
    //每次前进的默认步长 一步=单位距离
    private addStep:number;
    //最大步长,一般是起始点到目标点的轨迹距离
    private maxStep:number;
    //当前起始点A和目标点B
    private pA:Array<number>;private pB:Array<number>;
    //轨迹类型
    private trajectoryType:number;
    //当前位置
    public x:number;
    public y:number;
    //开始
    public start:boolean=false;
    constructor(){
        this.addStep=1;
    }
    /**
     * 设置起始点A
     * @param path 
     */
    public setPA(path:Array<number>){
        this.pA=path;
        this.x=path[0];this.y=path[1];
    }
    /**
     * 设置目标点B
     * @param path 
     */
    public setPB(path:Array<number>){
        this.pB=path;
        this.maxStep=Math.ceil(MathUtil.TDistence(this.pA,this.pB));
    }
    /**
     * 前进一定步数
     * @param onStep 前进的步数
     */
    public onStep(addStep?:number){
        //实际增加
        let nAddStep=addStep==undefined?this.addStep:addStep;
        this._stepTime+=nAddStep;
        console.log("当前步>>>>>>>>>>>>>"+this._stepTime);
        if(this._stepTime>this.maxStep) this._stepTime=this.maxStep;
        //计算位置
        let path:Array<number>=this.getStepPath();
        console.log("更新位置>>>>>>>>>>>>>"+path[0]+" "+path[1]);
        this.x=path[0]; 
        this.y=path[1];
        if(this._stepTime==this.maxStep) this.start=false; 
    }
    /**
     * 获取当前步所在位置
     */
    private getStepPath():Array<number>{
        //以当前位置为圆点,前进步长为半径的圆交点
        //解出关于圆交点的二次函数解
        let k:number=(this.pA[1]-this.pB[1])/(this.pA[0]-this.pB[0]);
        let la:number=this.pA[1]-k*this.pA[0];
        let b:number=(2*la*k-2*this.pA[1]*k-2*this.pA[0]);
        let a:number=k*k+1;
        let c:number=la*la-2*this.pA[1]*la+this.pA[1]*this.pA[1]+this.pA[0]*this.pA[0]-this._stepTime*this._stepTime;
        let sloveX:Array<number>=MathUtil.equation2Slove(a,b,c);
        let y1:number=k*sloveX[0]+la;
        let y2:number=k*sloveX[1]+la;
        if(MathUtil.TDistence([sloveX[0],y1],this.pB)<MathUtil.TDistence([sloveX[1],y2],this.pB)) return [sloveX[0],y1];
        else return [sloveX[1],y2];
    }
    /**
     * 重置
     */
    public reset():void{
        this._stepTime=0;
        this.x=this.pA[0],this.y=this.pA[1];
        this.start=false;
    }
    //销毁
    public dispose(){
        this._displays=null;
    }
}
enum TrajectoryType{
    
}