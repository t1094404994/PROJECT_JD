class Test1Model extends BaseModel{
    private infors:any[];
    constructor($controller:BaseController){
        super($controller);
        this.infors=[];
        this.infors.push({x:120,y:20,});
    }
    //创建浮动跳板
    private createGround(){
    }
    //创建一个方块
    private cerateRect(w:number,h:number,x:number,y:number):egret.Shape{
        let rect:egret.Shape=new egret.Shape();
        rect.graphics.beginFill(0x000000);
        rect.graphics.drawRect(x,y,w,h);
        rect.graphics.lineStyle(2,0xFFFFFF);
        rect.graphics.endFill();
        return rect;
    }
}