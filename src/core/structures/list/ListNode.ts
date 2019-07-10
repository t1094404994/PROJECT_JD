/**
 * 列表节点
 * by txz 2019.5.22
 * ADT:
 * data() 当前系欸但所存的数据对象
 * pred() 前驱节点
 * succ() 后继节点
 * insertAsPred(e) 插入前驱节点,存入被引用的对象e,返回新节点的位置
 * insertAsSucc(e) 插入后继节点,同上
 */
class ListNode<T> implements ICacheObject{
    private _data:T;
    public pred:ListNode<T>; //前驱
    public succ:ListNode<T>; //后继
    constructor(data?:T){
        if(data) this._data=data;
    }
    public insertAsPred(e:ListNode<T>){ //需要先清除引用
        e.succ=this;
        e.pred=this.pred;
        this.pred=null;
        this.pred=e;
        e.pred.succ=null;
        e.pred.succ=e;
    }
    public insertAsSucc(e:ListNode<T>){
        e.pred=this;
        e.succ=this.succ;
        this.succ=null;
        this.succ=e;
        e.succ.pred=null;
        e.succ.pred=e;
    }
    public set data(v:any){this._data=v;}
    public get data(){return this._data;}
    /**自定义比较器 大于*/
    public over(e:ListNode<T>):boolean{
        return this.data>e.data;
    };
    /**自定义比较器 小于*/
    public less(e:ListNode<T>):boolean{
        return this.data<e.data;
    }
    /**自定义比较器 等于*/
    public equal(e:ListNode<T>):boolean{
        return this.data==e.data;
    }
    /**
     * 使用次数
     **/
    public useCount:number;
    /**
     * 退回对象池的时间
     **/
    public backTime:number;
    /**
     * 销毁回收
     **/
    public dispose(isForce?:boolean){
        //this._data=null;
        this.succ=null;
        this.pred=null;
        this._data=null;
    }
    /**
     * 对象重置
     **/
    public reset(){
        this.succ=null;
        this.pred=null;
        this._data=null;
    }
}