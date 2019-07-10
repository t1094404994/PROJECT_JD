/**
 * 进度
 */
class Progress{
    public loaded:number;
    public total:number;
}
interface ILoadingUI{
    /**
     * 设置进度
     */
    setProgress(progress:Progress):void;
    /**
     * 显示loading
     */
    show():void;
    /**
     * 隐藏loading
     */
    hide():void;
}