//多边形 根据玩家点击拖动的点集绘制一个多边形
class Polygon{
    //被对象
    private lister:egret.DisplayObjectContainer;
    //回调
    private callFun:Function;
    //记录点集
    private _path:Array<Array<number>>;
    //记录的点集 相对于自身的坐标
    private _changePath:Array<Array<number>>;
    //画布 显示移动轨迹
    private shape:egret.Shape;
    //通过多边形的最小最大算出其对应四边形的位置
    private minX:number;
    private maxX:number;
    private minY:number;
    private maxY:number;
    //添加画布
    public onShape():egret.Shape{
        this.shape=new egret.Shape();
        return this.shape;
    }
    //关闭画布
    public offShape(){
        if(this.shape.parent) this.shape.parent.removeChild(this.shape);
    }
    /**
     * 开启或关闭监听
     * @param lister 监听者
     * @param bool 开启或关闭
     */
    public onEvt(lister:egret.DisplayObjectContainer,bool:boolean,call?:Function){
        this.lister=lister;
        if(call) this.callFun=call;
        if(bool){
            lister.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
            lister.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
            lister.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
        }else{
            lister.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
            lister.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
            lister.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
            this.callFun=null;
            this.lister=null;
        }
    }
    /** 开始点击*/
    private onBegin(e:egret.TouchEvent){
        this._path=[];
        let p:Array<number>=[e.localX,e.localY];
        this._path.push(p);
        //绘图
        this.shape.graphics.lineStyle(3,0x00FF00);
        this.shape.graphics.beginFill(0xFF00FF);
        this.shape.graphics.moveTo(p[0],p[1]);
        //初始化
        this.minX=p[0];
        this.maxX=p[0];
        this.minY=p[1];
        this.maxY=p[1];
    }
    /** 移动*/
    private onMove(e:egret.TouchEvent){
        let lastP:Array<number>=this._path[this._path.length-1];
        //停滞判定
        if(e.localX!=lastP[0]||e.localY!=lastP[1]){
            //计算两个邻接线段的弧度 如果弧度大于阈值
            //绘图
            let p:Array<number>=[e.localX,e.localY];
            //更新
            this.minX=this.minX<p[0]?this.minX:p[0];
            this.maxX=this.maxX>p[0]?this.maxX:p[0];
            this.minY=this.minY<p[1]?this.minY:p[1];
            this.maxY=this.maxY>p[1]?this.maxY:p[1];
            //绘图
            this._path.push(p);
            this.shape.graphics.lineTo(p[0],p[1]);
            this.shape.graphics.moveTo(p[0],p[1]);
        }
    }
    /** 松开*/
    private onEnd(e:egret.TouchEvent){
        let p:Array<number>=[e.localX,e.localY];
        //更新
        this.minX=this.minX<p[0]?this.minX:p[0];
        this.maxX=this.maxX>p[0]?this.maxX:p[0];
        this.minY=this.minY<p[1]?this.minY:p[1];
        this.maxY=this.maxY>p[1]?this.maxY:p[1];
        //绘图
        this._path.push(p);
        this.shape.graphics.lineTo(p[0],p[1]);
        this.shape.graphics.moveTo(p[0],p[1]);
        //首尾相连
        this.shape.graphics.lineTo(this._path[0][0],this._path[0][1]);
        this.shape.graphics.endFill();
        this.onComplete();
    }
    /** 完成一个过程*/
    private onComplete(){
        this.shape.graphics.clear();
        //清除一些不必要的点
        this._path=MathUtil.removeCollinearPoints(this._path,Math.PI/6);
        if(MathUtil.checkPolygon(this._path)){
            this.changePath();
            this.callFun.call(this.lister);
        }else{
            console.log(">>>>>>>>>>>>>>无法构成多边形");
        }
    }
    /** 计算多边形的位置*/
    public getPoint():egret.Point{
        let x:number=this.minX+this.maxX/2-this.minX/2;
        let y:number=this.minY+this.maxY/2-this.minY/2;
        return egret.Point.create(x,y);
    }
    /** 获得点集*/
    public getPath():Array<Array<number>>{
        return this._path;
    }
    /** 转换成方形的相对坐标*/
    private changePath():void{
        let l:number=this._path.length;
        let p:Array<number>;
        let p2:Array<number>;
        this._changePath=[];
        for(let i=0;i<l;i++){
            p=this._path[i];
            p2=[p[0]-this.minX,p[1]-this.minY];
            this._changePath.push(p2);
        }
    }
    /** 获得相对位置的点集*/
    public getChangePath():Array<Array<number>>{
        return this._changePath;
    }
}