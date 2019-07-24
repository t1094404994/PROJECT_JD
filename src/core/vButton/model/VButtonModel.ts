class VButtonModel{
    private touchTime:number;
    private type:VButtonConst;
    private buttonPt:Object; //记录按钮位置
    private vbutton:VButton;//按钮图形
    constructor(){
        this.buttonPt={};
        this.touchTime=0;
    }
    /**
     * 按钮状态发生改变
     * @param type 按钮状态
     * @param p 位置
     */
    public onChange(type:VButtonConst,p:egret.Point){
        this.type=type;
        this.buttonPt[type]=p;
        this.upHoleTime();
    }

    /** 更新HOLD时间*/
    private upHoleTime(){
        if(this.type==VButtonConst.ON) this.touchTime=egret.getTimer();
    }

    /**
     * 获取按住的时间
     * @return 时间
     */
    public getHoldTime():number{
        if(!this.touchTime) return 0;
        else return egret.getTimer()-this.touchTime;
    }
    /**
     * 销毁
     */
    public dispos(){
        this.vbutton.offListen();
        this.vbutton=null;
        for(let k in this.buttonPt){
            egret.Point.release(this.buttonPt[k]);
            this.buttonPt[k]=null;
            delete this.buttonPt[k];
        }
        this.buttonPt=null;
    }
}