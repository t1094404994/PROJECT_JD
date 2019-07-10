class Test1Sence extends BaseSence{
    constructor(){
        super();
        this.width=900;
        this.height=1600;
    }
    public onEnter(){
        let controller:Test1Controller=new Test1Controller();
        let model:Test1Model=new Test1Model(controller);
        App.getControllerManager().register(ControllerConst.TEST1,controller);
        App.getViewManger().register(ViewConst.TEST1,new TEST1View(controller,this));
        controller.setModel(model);
        controller.openView(ViewConst.TEST1);
    }
    public onExit(){

    }
}