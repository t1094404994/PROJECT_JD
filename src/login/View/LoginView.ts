class LoginView extends BaseEuiView{
    public btnInto:eui.Button;
    public ui_label:eui.Label;
    constructor($controller:BaseController, $parent:egret.DisplayObjectContainer){
        super($controller,$parent);
        this.skinName="resource/skins/Login/LoginSenceSkin.exml";
    }
    public open(){
        egret.setTimeout(function(){
            this.btnInto.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
        },this,1000);
    }
    public close(){
        this.btnInto.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this);
    }
    private onTap(){
        this._controller.applyFunc("onTap");
    }
}