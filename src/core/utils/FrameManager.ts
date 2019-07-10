/**
 * 帧刷工具类(也可以定时刷)
 * 本质回调派发器,只是每帧检测
 * by txz extends yangsong@github
 */
class FrameManager extends SingtonClass{
    private frameHanders:Array<FrameHander>;//保存的调用类,依效果可能换成列表或优先级队列结构
    private currTime:number;//记录时间
    private frame:number;//帧计数器
    constructor(){
        super();
        this.currTime=egret.getTimer();
        this.frame=0;
        this.frameHanders=[];
        egret.startTick(this.onTick,this);
    }
    public onTick(t:number){
        this.frame++;
        let frameHander:FrameHander;
        this.currTime=t;
        let len:number=this.frameHanders.length;
        for(let i=0;i<len;i++){
            frameHander=this.frameHanders[i];
            if(frameHander.freezed) continue;
            if((frameHander.frameFalsh&&this.frame-frameHander.lastframe>=frameHander.delay)){
                frameHander.callFun.call(frameHander.callObj,t-frameHander.lastTime);
                frameHander.lastframe=this.frame;
                frameHander.lastTime=t;
                frameHander.haveCallTimes++;
                if(frameHander.haveCallTimes==frameHander.callTimes){
                    if(frameHander.comCallFun) frameHander.comCallFun.call(frameHander.callObj);
                    this.frameHanders.splice(+i,1);
                    len--;i--;
                }
            }else if(!frameHander.frameFalsh&&t-frameHander.lastTime>=frameHander.delay){
                frameHander.callFun.call(frameHander.callObj,t-frameHander.lastTime);
                frameHander.lastframe=this.frame;
                frameHander.lastTime=t;
                frameHander.haveCallTimes++;
                if(frameHander.haveCallTimes==frameHander.callTimes){
                    if(frameHander.comCallFun) frameHander.comCallFun.call(frameHander.callObj);
                    this.frameHanders.splice(+i,1);
                    len--;i--;
                }
            } 
        }
        return false;
    }
    //暂停所有
    public stop(){
        egret.stopTick(this.onTick,this);
    }
    //重新开始
    public start(){
        this.currTime=egret.getTimer();
        egret.startTick(this.onTick,this);
    }

    private addHander(cF:Function,cO:any,frF:boolean,de=-1,cT:number=-1,ccF:Function=null,fre:boolean=false):FrameHander{
        let frameHander=this.isExists(cF,cO);
        if(frameHander) return frameHander;
        frameHander=new FrameHander(cF,cO,frF,de,cT,ccF,fre);
        frameHander.lastTime=this.currTime;
        frameHander.lastframe=this.frame;
        this.frameHanders.push(frameHander);
        return frameHander;
    }
    /**
     * 创建帧回调
     * @param cF 执行函数
     * @param cO  执行者
     * @param de 刷新帧
     * @param cT 执行次数
     * @param ccF 完成
     * @param fre 是否冷冻
     */
    public creadFrameHander(cF:Function,cO:any,de=-1,cT:number=-1,ccF:Function=null,fre:boolean=false):FrameHander{
        let frF=true;
        return this.addHander(cF,cO,frF,de,cT,ccF,fre);
    }
    /**
     * 创建
     * @param cF 执行函数
     * @param cO  执行者
     * @param de 刷新时间
     * @param cT 执行次数
     * @param ccF 完成
     * @param fre 是否冷冻
     */
    public creadTimeHander(cF:Function,cO:any,de=-1,cT:number=-1,ccF:Function=null,fre:boolean=false):FrameHander{
        let frF=false;
        return this.addHander(cF,cO,frF,de,cT,ccF,fre);
    }
    /**
     * 无序向量单查重,不会出现多个重复，所以可在线性时间内完成
     * @param callFun 
     * @param callObj 
     * @param force 是否删除 
     */
    private isExists(callFun:Function,callObj:any,force:boolean=false){
        for(let i in this.frameHanders){
            let k=this.frameHanders[i];
            if(k.callFun==callFun&&k.callObj==k.callObj){
                if(force) this.frameHanders.splice(+i,1); 
                return k;
            }
        }
        return null;
    }
    /**
     * 删除已经存在的Hander
     * @param callFun 之前加入的回调
     * @param callObj 之前加入的回调对象
     */
    public removeHander(callFun:Function,callObj:any){
        this.isExists(callFun,callObj,true);
    }
}
//帧刷调用类
class FrameHander{
    public frameFalsh:boolean;//是否帧刷新
    public delay:number;//刷新时间或者刷新帧 -1表示每帧执行
    //public rightnow:boolean;//是否立即执行一次
    public callFun:Function;//执行函数
    public callObj:any;//执行者
    public callTimes:number;//执行次数 -1表示一直执行
    public haveCallTimes:number;//已经执行的次数
    public comCallFun:Function;//完成次数执行,没有设置则执行callFun
    //public callargs:any[];//执行参数
    public lastTime:number;//上次执行的时间
    public lastframe:number;//上次执行帧
    public freezed:boolean;//是否冷冻 暂停
    /**
     * 构造
     * @param cF 执行函数
     * @param cO  执行者
     * @param frF 是否是帧刷新
     * @param de 刷新帧或者时间
     * @param cT 执行次数
     * @param ccF 完成
     * @param fre 是否冷冻
     */
    constructor(cF:Function,cO:any,frF:boolean,de=-1,cT:number=-1,ccF:Function=null,fre:boolean=false){
        this.callFun=cF;this.callObj=cO;this.frameFalsh=frF;this.delay=de;this.callTimes=cT;this.comCallFun=ccF;this.freezed=fre;
        this.haveCallTimes=0;
    }
    public clear(){
        this.callFun=null;
        this.callObj=null;
        this.comCallFun=null;
    }
}