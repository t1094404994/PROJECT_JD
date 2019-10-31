//多边形 根据玩家点击拖动的点集绘制一个多边形
class Polygon{
    //被对象
    private lister:egret.DisplayObjectContainer;
    //回调
    private callFun:Function;
    //记录点集
    private _path:Array<egret.Point>;
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
        let p=egret.Point.create(e.localX,e.localY);
        this._path.push(p);
        //绘图
        this.shape.graphics.lineStyle(3,0x00FF00);
        this.shape.graphics.beginFill(0xFF00FF);
        this.shape.graphics.moveTo(p.x,p.y);
        //初始化
        this.minX=p.x;
        this.maxX=p.x;
        this.minY=p.y;
        this.maxY=p.y;
    }
    /** 移动*/
    private onMove(e:egret.TouchEvent){
        let lastP:egret.Point=this._path[this._path.length-1];
        //停滞判定
        if(e.localX!=lastP.x||e.localY!=lastP.y){
            //绘图
            let p=egret.Point.create(e.localX,e.localY);
            //更新
            this.minX=this.minX<p.x?this.minX:p.x;
            this.maxX=this.maxX>p.x?this.maxX:p.x;
            this.minY=this.minY<p.y?this.minY:p.y;
            this.maxY=this.maxY>p.y?this.maxY:p.y;
            //绘图
            this._path.push(p);
            this.shape.graphics.lineTo(p.x,p.y);
            this.shape.graphics.moveTo(p.x,p.y);
        }
    }
    /** 松开*/
    private onEnd(e:egret.TouchEvent){
        let p=egret.Point.create(e.localX,e.localY);
        //更新
        this.minX=this.minX<p.x?this.minX:p.x;
        this.maxX=this.maxX>p.x?this.maxX:p.x;
        this.minY=this.minY<p.y?this.minY:p.y;
        this.maxY=this.maxY>p.y?this.maxY:p.y;
        //绘图
        this._path.push(p);
        this.shape.graphics.lineTo(p.x,p.y);
        this.shape.graphics.moveTo(p.x,p.y);
        //首尾相连
        this.shape.graphics.lineTo(this._path[0].x,this._path[0].y);
        this.shape.graphics.endFill();
        this.onComplete();
    }
    /** 完成一个过程*/
    private onComplete(){
        this.shape.graphics.clear();
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
    public getPath():Array<egret.Point>{
        return this._path;
    }
    /** 转换成方形的相对坐标*/
    private changePath():void{
        let l:number=this._path.length;
        let p:egret.Point;
        for(let i=0;i<l;i++){
            p=this._path[i];
            p.x=p.x-this.minX;
            p.y=p.y-this.minY;
        }
    }
}