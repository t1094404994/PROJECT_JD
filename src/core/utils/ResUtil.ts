class ResUtil{
    /**
         * 加载资源组
         * @param groups 当前加载资源组列表
         * @param onLoadProgress 资源组加载进度回调
         * @param onLoadFaild 资源组加载失败回调
         * @param onLoadComplete 资源组加载完成回调
         * @param thisObj
         * @param param? 参数列表
         */
        public static loadGroups(groups: string[], onLoadProgress: (data: GroupData) => void, onLoadFaild: (data: GroupData) => void, onLoadComplete: (data: GroupData) => void, thisObj: any, param?: any): void {
            if (groups) {
                let groupData: GroupData = new GroupData();
                groupData.loadQueue = groups.concat();
                groupData.loadedQueue = [];
                groupData.loaded = 0;
                groupData.total = groups.length;
                groupData.onLoadProgress = onLoadProgress;
                groupData.onLoadFaild = onLoadFaild;
                groupData.onLoadComplete = onLoadComplete;
                groupData.thisObj = thisObj;
                groupData.param = param;
                if (groups.length > 0) {
                    let loader: GroupLoader = new GroupLoader();
                    loader.loadGroups(groupData);
                } else {
                    if (onLoadComplete) {
                        onLoadComplete.call(thisObj, groupData);
                    }
                }
            }
        }
        /**
         * 释放资源组
         * @param name 资源组数组。
         * @param force 销毁一个资源组时其他资源组有同样资源情况资源是否会被删除，默认值 false。
         */
        public static destoryGroups(groups: string[], force: boolean = false): void {
            if (groups) {
                for (let i: number = 0, iLen: number = groups.length; i < iLen; i++) {
                    let bool:boolean=RES.destroyRes(groups[i], force);
                    egret.log(`释放资源或资源组${groups[i]}`+bool)
                }
            }
        }
}
/**
 * 资源组加载器
 */
class GroupLoader{
    private groupData:GroupData;
    constructor(){
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
    }
    private onResourceLoadError(event:RES.ResourceEvent):void{
        if(this.groupData.curGroup!=event.groupName) return;
        egret.log(`资源组: ${event.groupName}加载失败`);
        this.groupData.curGroupLoaded=event.itemsLoaded;
        this.groupData.curGroupTotal=event.itemsTotal;
        this.groupData.curResItem=event.resItem;
        if(this.groupData.onLoadFaild) this.groupData.onLoadFaild.call(this.groupData.thisObj,this.groupData);
    }
    private onResourceProgress(event:RES.ResourceEvent):void{
        return this.updateGroupData(event.groupName,event.itemsLoaded,event.itemsTotal,event.resItem);
    }
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (this.groupData.curGroup != event.groupName) {
            return;
        }
        egret.log(`资源组：${event.groupName} 加载完成`);
        this.groupData.loadedQueue.push(event.groupName);
        this.groupData.loaded = this.groupData.loadedQueue.length;
        this.updateGroupData(event.groupName, this.groupData.curGroupTotal, this.groupData.curGroupTotal);
        return this.loadNext();
    }

    private updateGroupData(group: string, loadedItems: number = 0, totalItems: number = 0, resItem?: RES.ResourceItem): void {
        if (this.groupData.curGroup != group) {
            return;
        }
        this.groupData.curGroupLoaded = loadedItems;
        this.groupData.curGroupTotal = totalItems;
        this.groupData.curResItem = resItem;
        if (this.groupData.onLoadProgress) {
            this.groupData.onLoadProgress.call(this.groupData.thisObj, this.groupData);
        }
    }

    private loadNext(): void {
        let group: string = this.groupData.loadQueue.shift();
        if (group) {
            this.groupData.curGroup = group;
            RES.loadGroup(group);
        } else {
            if (this.groupData.onLoadComplete) {
                this.groupData.onLoadComplete.call(this.groupData.thisObj, this.groupData);
            }
            this.destory();
        }
    }
    /**
     * 释放加载器
     */
    public destory(): void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
        this.groupData = null;
    }
    /**
     * 开始加载资源组
     */
    public loadGroups(data: GroupData): void {
        this.groupData = data;
        return this.loadNext();
    }
}
/**
 * 资源加载
 */
class GroupData extends Progress{
    public loadQueue:string[];//加载队列
    public loadedQueue:string[];//已加载队列
    public curGroup:string; //正在加载的资源组
    public curGroupLoaded:number; //资源组已经加载的文件数
    public curGroupTotal:number;  //资源组文件总数
    public curResItem:RES.ResourceItem; 
    public onLoadProgress:(data:GroupData)=>void;
    public onLoadFaild:(data:GroupData)=>void;
    public onLoadComplete:(data:GroupData)=>void;
    public thisObj:any;
    public param:any;
    //获得当前资源组百分比
    public getGroupPercent():number{
        return Math.floor(this.curGroupLoaded*100/this.curGroupTotal);
    }
    //获得总百分比
    public getPercent():number{
        if(this.loaded==this.total) return 100;
        let nowP:number=this.curGroupLoaded/this.curGroupTotal;
        return Math.floor(100*(nowP+this.loaded)/this.total);
    }
}