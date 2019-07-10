/**
 * 基于栈结构的对象池
 * by txz 2019.6.11
 * ADT:
 * getObject(ICacheObject) //取对象
 * backObject(ICacheObject) //还对象
 * gc() //定时销毁无用对象
 */
class ObjectPool{
    private pool:Object; //存放对象
    private gcTime:number=600000;//对象池无用对象销毁时间毫秒
    private static _instance:ObjectPool; //单例
    constructor(){
        this.pool={};
    }
    public get instance(){
        if(!ObjectPool._instance) ObjectPool._instance=new ObjectPool();
        return ObjectPool._instance;
    }
    public getObject(obj:any,...args):ICacheObject{
        let objName:string=egret.getQualifiedClassName(obj);
        let list:any[]=this.pool[objName]; 
        if(!list||!list.length) return new obj(...args);
        let getObj=list.pop();
        getObj.useCount=1;
        return getObj;
    }
    public backObject(obj:any){
        let objName:string=egret.getQualifiedClassName(obj);
        if(!this.pool[objName]) this.pool[objName]=[];
        let list:any[]=this.pool[objName];
        list.push(obj);
        obj.reset();
        obj.useCount=0;
        obj.backTime=Date.now();
    }
    public gc(){
        let list:any[];
        let timeline:number=Date.now()-this.gcTime;//放入时间点分割
        for(let k in this.pool){
            list=this.pool[k];
            let len=list.length;
            while(len--){
                let obj:ICacheObject=list[len];
                if(list[len].backTime<timeline){ //因为是栈结构,所以时间点左侧的全部都删除
                    for(let i=0;i<=len;i++){
                        list[i].dispose();
                    }
                    list.slice(0,len);
                    break;
                }
            }
            if(!list.length) delete this.pool[k];
        }
    }
}
/**
 * 对象池接口
 * ADT:
 * useCount 使用次数
 * backTime 存入对象池中的时间
 * dispose //对象销毁
 * reset 对象重置 
 */
interface ICacheObject{
    useCount:number;
    backTime:number;
    dispose();
    reset();
}