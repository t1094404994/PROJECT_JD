class LoginSence extends BaseSence{
    constructor(){
        super();
        this.width=900;
        this.height=1600;
    }
    public onEnter(){
        let loginController:LoginController=new LoginController();
        let loginModel:LoginModel=new LoginModel(loginController);
        loginController.setModel(loginModel);
        App.getControllerManager().register(ControllerConst.LOGIN,loginController);
        App.getViewManger().register(ViewConst.LOGIN,new LoginView(loginController,this));
        loginController.openView(ViewConst.LOGIN);
    }
    public onExit(){
        App.getViewManger().close(ViewConst.LOGIN);
    }
    protected destroy(){
        
    }
}