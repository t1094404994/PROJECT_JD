var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ResUtil = (function () {
    function ResUtil() {
    }
    /**
         * 加载资源组
         * @param groups 当前加载资源组列表
         * @param onLoadProgress 资源组加载进度回调
         * @param onLoadFaild 资源组加载失败回调
         * @param onLoadComplete 资源组加载完成回调
         * @param thisObj
         * @param param? 参数列表
         */
    ResUtil.loadGroups = function (groups, onLoadProgress, onLoadFaild, onLoadComplete, thisObj, param) {
        if (groups) {
            var groupData = new GroupData();
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
                var loader = new GroupLoader();
                loader.loadGroups(groupData);
            }
            else {
                if (onLoadComplete) {
                    onLoadComplete.call(thisObj, groupData);
                }
            }
        }
    };
    /**
     * 释放资源组
     * @param name 资源组数组。
     * @param force 销毁一个资源组时其他资源组有同样资源情况资源是否会被删除，默认值 false。
     */
    ResUtil.destoryGroups = function (groups, force) {
        if (force === void 0) { force = false; }
        if (groups) {
            for (var i = 0, iLen = groups.length; i < iLen; i++) {
                var bool = RES.destroyRes(groups[i], force);
                egret.log("\u91CA\u653E\u8D44\u6E90\u6216\u8D44\u6E90\u7EC4" + groups[i] + bool);
            }
        }
    };
    return ResUtil;
}());
__reflect(ResUtil.prototype, "ResUtil");
/**
 * 资源组加载器
 */
var GroupLoader = (function () {
    function GroupLoader() {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
    }
    GroupLoader.prototype.onResourceLoadError = function (event) {
        if (this.groupData.curGroup != event.groupName)
            return;
        egret.log("\u8D44\u6E90\u7EC4: " + event.groupName + "\u52A0\u8F7D\u5931\u8D25");
        this.groupData.curGroupLoaded = event.itemsLoaded;
        this.groupData.curGroupTotal = event.itemsTotal;
        this.groupData.curResItem = event.resItem;
        if (this.groupData.onLoadFaild)
            this.groupData.onLoadFaild.call(this.groupData.thisObj, this.groupData);
    };
    GroupLoader.prototype.onResourceProgress = function (event) {
        return this.updateGroupData(event.groupName, event.itemsLoaded, event.itemsTotal, event.resItem);
    };
    GroupLoader.prototype.onResourceLoadComplete = function (event) {
        if (this.groupData.curGroup != event.groupName) {
            return;
        }
        egret.log("\u8D44\u6E90\u7EC4\uFF1A" + event.groupName + " \u52A0\u8F7D\u5B8C\u6210");
        this.groupData.loadedQueue.push(event.groupName);
        this.groupData.loaded = this.groupData.loadedQueue.length;
        this.updateGroupData(event.groupName, this.groupData.curGroupTotal, this.groupData.curGroupTotal);
        return this.loadNext();
    };
    GroupLoader.prototype.updateGroupData = function (group, loadedItems, totalItems, resItem) {
        if (loadedItems === void 0) { loadedItems = 0; }
        if (totalItems === void 0) { totalItems = 0; }
        if (this.groupData.curGroup != group) {
            return;
        }
        this.groupData.curGroupLoaded = loadedItems;
        this.groupData.curGroupTotal = totalItems;
        this.groupData.curResItem = resItem;
        if (this.groupData.onLoadProgress) {
            this.groupData.onLoadProgress.call(this.groupData.thisObj, this.groupData);
        }
    };
    GroupLoader.prototype.loadNext = function () {
        var group = this.groupData.loadQueue.shift();
        if (group) {
            this.groupData.curGroup = group;
            RES.loadGroup(group);
        }
        else {
            if (this.groupData.onLoadComplete) {
                this.groupData.onLoadComplete.call(this.groupData.thisObj, this.groupData);
            }
            this.destory();
        }
    };
    /**
     * 释放加载器
     */
    GroupLoader.prototype.destory = function () {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceLoadError, this);
        this.groupData = null;
    };
    /**
     * 开始加载资源组
     */
    GroupLoader.prototype.loadGroups = function (data) {
        this.groupData = data;
        return this.loadNext();
    };
    return GroupLoader;
}());
__reflect(GroupLoader.prototype, "GroupLoader");
/**
 * 资源加载
 */
var GroupData = (function (_super) {
    __extends(GroupData, _super);
    function GroupData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //获得当前资源组百分比
    GroupData.prototype.getGroupPercent = function () {
        return Math.floor(this.curGroupLoaded * 100 / this.curGroupTotal);
    };
    //获得总百分比
    GroupData.prototype.getPercent = function () {
        if (this.loaded == this.total)
            return 100;
        var nowP = this.curGroupLoaded / this.curGroupTotal;
        return Math.floor(100 * (nowP + this.loaded) / this.total);
    };
    return GroupData;
}(Progress));
__reflect(GroupData.prototype, "GroupData");
