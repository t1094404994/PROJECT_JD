class LoginModel extends BaseModel{
    constructor($controller:BaseController){
        super($controller);
        this._controller.registerFunc("onTap",this.onTap,this);
    }
    private onTap(){
        let source:string[]=["testtttt"];
        App.getEasyLoading().loadSource(source,this.souceCom.bind(this));
    }
    private souceCom(){
        let sence=new Test1Sence();
        App.getSenceManger().register(SenceConst.TEST1,sence);
        App.getSenceManger().changeSence(SenceConst.TEST1);
        this._controller.compleClose(ViewConst.LOGIN);
    }
}