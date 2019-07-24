/**
 * 虚拟按键基类
 */
class VButton extends eui.Button{
    private model:VButtonModel
    private type:VButtonConst;
    constructor(model:VButtonModel){
        super();
        this.model=model;
    }
    public onListen(){
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
    }
    public offListen(){
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBegin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMove,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEnd,this);
    }
    private onBegin(e:egret.TouchEvent){
        let p:egret.Point=egret.Point.create(e.target.x,e.target.y);
        this.changeType(VButtonConst.ON,p);
    }
    private onMove(e:egret.TouchEvent){
        let p:egret.Point=egret.Point.create(e.target.x,e.target.y);
        this.changeType(VButtonConst.CONTINUE,p);
    }
    private onEnd(e:egret.TouchEvent){
        let p:egret.Point=egret.Point.create(e.target.x,e.target.y);
        this.changeType(VButtonConst.OFF,p);
    }
    private changeType(type:VButtonConst,p:egret.Point){
        this.model.onChange(type,p);
    }
}