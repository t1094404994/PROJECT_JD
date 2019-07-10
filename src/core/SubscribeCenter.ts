/**
 * 订阅模式 中间管理者
 * 使用对象-数组(名称-订阅者们) 所有方法均在线性时间复杂度内完成
 * 订阅者需要有一个订阅名字相同的函数接收,方便直接回调
 * by txz 2019.6.17
 */
class SubscribeCenter extends SingtonClass{
    private subscribeTypes:Object;
    constructor(){
        super();
        this.subscribeTypes={};
    }
    /**
     * 订阅
     * @param name 订阅的名字
     * @param who 订阅者
     */
    public subscribe(name:string,who:any){
        if(!this.subscribeTypes.hasOwnProperty(name)) this.subscribeTypes[name]=[];
        let subscribes:any[]=this.subscribeTypes[name];
        if(subscribes.indexOf(who)!=-1) return;
        subscribes.push(who);
    }
    /**
     * 取关
     * @param name 订阅的名字
     * @param who  订阅者
     */
    public unSubscribe(name:string,who:any){
        if(!this.subscribeTypes.hasOwnProperty(name)) return;
        let subscribes:any[]=this.subscribeTypes[name];
        let index:number=subscribes.indexOf(who);
        if(index!=-1) subscribes.splice(index,1);
        if(!subscribes.length) delete this.subscribeTypes[name];
    }
    
    /**
     * 派送
     * @param name 派送的名字
     */
    public deliver(name:string,...arg){
        let subscribes:any[]=this.subscribeTypes[name];
        for(let k of subscribes){
            let fun:Function=k[name];
            if(fun){
                if(arg&&arg.length>0) fun.apply(k,arg);
                else fun.call(k);
            }
        }
    }
}