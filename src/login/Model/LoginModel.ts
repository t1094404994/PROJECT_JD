class LoginModel extends BaseModel{
    constructor($controller:BaseController){
        super($controller);
        this._controller.registerFunc("onTap",this.onTap,this);
    }
    private onTap(){
        let sence=new Test1Sence();
        App.getSenceManger().register(SenceConst.TEST1,sence);
        App.getSenceManger().changeSence(SenceConst.TEST1,["testtttt"]);
        this._controller.compleClose(ViewConst.LOGIN);
    }
}