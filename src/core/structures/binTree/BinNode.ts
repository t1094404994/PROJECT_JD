/**
 * 二叉树节点
 * by txz leran to book
 */
class BinNode<T>{
    public parent:BinNode<T>;public lc:BinNode<T>;public rc:BinNode<T>;
    public data:T;//数据
    public height:number; //节点子树高
    public npl:number;//Null Path Height(左式堆,也可以直接用height代替)
    public color:RBColor;//颜色(红黑树)
    
    /**
     * 构造
     * @param e 数据
     * @param p 父节点
     * @param lc 左孩子
     * @param rc 右孩子
     * @param h 高度
     * @param l 左式堆
     * @param c 颜色
     */
    constructor(e:T,p:BinNode<T>=null,lc:BinNode<T>=null,rc:BinNode<T>=null,h:number=0,l:number=1,c:RBColor=RBColor.RB_RED){
        this.data=e;this.parent=p;this.lc=lc;this.rc=rc;this.height=h;this.npl=l;this.color=c;
    }
    //后代总数 TODO
    public size():number{
        let l:number=0;
        return l;
    }
    /**
     * 将e作为当前节点的左孩子插入
     * @param e 节点数据
     */
    public insertAsLC(e:T):BinNode<T>{
        if(this.lc){
            this.lc.data=e;
            return this.lc;
        }
        return this.lc=new BinNode<T>(e,this);
    }
    /**
     * 将e作为当前节点的右孩子插入
     * @param e 节点数据 
     */
    public insertAsRc(e:T):BinNode<T>{
        if(this.rc){
            this.rc.data=e;
            return this.rc;
        }
        return this.rc=new BinNode<T>(e,this);
    }
    //取当前节点的直接后继
    public succ():BinNode<T>{
        if(this.lc) return this.lc;
        if(this.rc) return this.rc;
        return null;
    }
    //子树层次遍历
    public travLevel():void{
        
    }
    //子树先序遍历VLR 迭代
    public travPre(list:(x:BinNode<T>)=>void):void{
        let S:BinNode<T>[]=[];//栈保存R
        let x:BinNode<T>=this;
        //自己写的
        //while(x||S.length){
            //list(x) //操作
            // if(BinNode.HasRChild(x)) S.push(x.rc); //如果有右孩子,则保存
            // if(BinNode.HasLChild(x))   x=x.lc; //如果有左孩子,则继续深入
            // else if(S.length) x=S.pop(); //如果没有,则访问最靠近的右孩子
            // else break; //也没有,则遍历完毕
        //}
        //教材写的
        S.push(x);
        while(S.length){
            let x:BinNode<T>=S.pop();
            list(x);
            if(BinNode.HasRChild(x)) S.push(x.rc);
            if(BinNode.HasLChild(x)) S.push(x.lc);
        }
    }
    //子树中序遍历LVR 迭代
    public travIn(list:(x:BinNode<T>)=>void):void{
        
    }
    //子树后序遍历LRV 迭代
    public travPose(list:(x:BinNode<T>)=>void):void{

    }
    //TODO 比较器 判等器

    /**
     * 节点p的高度
     * @param p 节点
     */
    public static stature(p:BinNode<any>):number{
        return p?p.height:-1;
    }
    public static IsRoot(x):boolean{
        return !x.parent;
    }
    public static IsLChild(x):boolean{
        return !BinNode.IsRoot(x)&&x==x.parent.lc;
    }
    public static IsRChild(x):boolean{
        return !BinNode.IsRoot(x)&&x==x.parent.rc;
    }
    public static HasParent(x):boolean{
        return !BinNode.IsRoot(x);
    }
    public static HasLChild(x):any{
        return x.lc;
    }
    public static HasRChild(x):any{
        return x.rc;
    }
    public static HasChild(x):boolean{
        return BinNode.HasLChild(x)||BinNode.HasRChild(x);
    }
    public static HasBothChild(x):boolean{
        return BinNode.HasLChild(x)&&BinNode.HasRChild(x);
    }
}
//节点颜色
enum RBColor{RB_RED,RB_BLACK}