/**
 * 主控程序
 */
class App{
    /**
     * 帧或时间回调派发类
     */
    public static getFrameManager():FrameManager{
        return FrameManager.getSingtonInstance();
    }
    /**
     * 显示对象工具类
     */
    public static getDisplayUtils():DisplayUtils{
        return DisplayUtils.getSingtonInstance();
    }
    /**
     * 控制器管理类
     */
    public static getControllerManager():ControllerManager{
        return ControllerManager.getSingtonInstance();
    }
    /**
     * 通用Loading动画
     * @returns {any}
     * @constructor
     */
    public static getEasyLoading(): EasyLoading {
        return EasyLoading.getSingtonInstance();
    }
    /**
     * 舞台信息
     */
    public static getStageUtils():StageUtils{
        return StageUtils.getSingtonInstance();
    }
    /**
     * 窗口管理类
     */
    public static getViewManger():ViewManager{
        return ViewManager.getSingtonInstance();
    }
    /**
     * 场景管理类
     */
    public static getSenceManger():SenceManager{
        return SenceManager.getSingtonInstance();
    }
}