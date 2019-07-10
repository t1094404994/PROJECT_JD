/**
 * BinTree 二叉树基类
 * ADT:
 * depth(v) 节点v到根节点的边数
 * height(v) 节点v的子树高度
 * root根节点
 */
class BinTree<T>{
    protected _root:BinNode<T>;//跟节点
    protected _size:number; //规模
    /**
     * 更新节点x的高度
     * @param x 需要更新的节点
     */
    protected updateHeight(x:BinNode<T>):number{
        let oldh:number=x.height;
        return x.height=1+Math.max.call(this,BinNode.stature(x.lc),BinNode.stature(x.rc));
    }
    /**
     * 更新高度
     * 每当节点插入或移除都要调用更新高度
     * @param x 从x节点开始
     */
    protected updateHeightAbove(x:BinNode<T>){
        while(x){let oldh:number=x.height;this.updateHeight(x);if(oldh==x.height) break;x=x.parent;}
    }
    constructor(){
        this._size=0;
        this.root=null;
    }
    //销毁
    public dispose(){

    }
    //规模
    public size():number{
        return this._size;
    }
    //判空
    public empty():boolean{
        return !this.root;
    }
    //跟节点
    public root():BinNode<T>{
        return this._root;
    }
    /**
     * 插入根节点
     * @param e 节点数据
     */
    public insertAsRoot(e:T){
        this._size=1;
        this._root=new BinNode<T>(e);
    }
    /**
     * 将e作为x的左孩子插入
     * @param x 
     * @param e 
     */
    public insertAsLc(x:BinNode<T>,e:T):BinNode<T>{
        this._size++;
        x.insertAsLC(e);
        this.updateHeightAbove(x);
        return x.lc;
    }
    /**
     * 将e作为x的右孩子插入
     * @param x 
     * @param e 
     */
    public insertAsRc(x:BinNode<T>,e:T):BinNode<T>{
        this._size++;
        x.insertAsRc(e);
        this.updateHeightAbove(x);
        return x.rc;
    }
    /**
     * 删除以位置x节点为根的子树,返回子树规模
     * @param x 节点
     * @return 子树规模
     */
    public remove(x:BinNode<T>):number{
        if(BinNode.IsLChild(x)) x.parent.lc=null;//切断来自父节点的引用 
        else if(BinNode.IsRChild(x)) x.parent.rc=null;//切断来自父节点的引用
        let n:number=this.removeAt(x);this._size-=n;return n; 
    }
    /**
     * 删除以位置x节点为根的子树,返回子树规模
     * @param x 
     */
    public removeAt(x:BinNode<T>):number{
        if(!x) return 0;//递归基(空树)
        let n:number=1+this.removeAt(x.lc)+this.removeAt(x.rc);
        x.data=null;x=null;return n; 
    }
    /**
     * 将S当做节点x的左子树接入,S本身置空
     * @param x 
     * @param S 
     */
    public attachAsLc(x:BinNode<T>,S:BinTree<T>){
        if(x.lc=S._root) x.lc.parent=x;//接入
        this._size+=S._size;this.updateHeightAbove(x);//更新树规模和x及其祖先的高度
        S._root=null;S._size=0;this.release(S);S=null;return x;//释放原树,返回接入位置
    }
    /**
     * 将S当做节点x的右子树接入,S本身置空
     * @param x 
     * @param S 
     */
    public attachAsRc(x:BinNode<T>,S:BinTree<T>){
        if(x.rc=S._root) x.rc.parent=x;//接入
        this._size+=S._size;this.updateHeightAbove(x);//更新树规模和x及其祖先的高度
        S._root=null;S._size=0;this.release(S);S=null;return x;//释放原树,返回接入位置
    }
    /**
     * 将以位置x节点为根的子树摘除,并将其转换为一颗独立子树
     * @param x 节点
     * @returns 子树
     */
    public secede(x:BinNode<T>):BinTree<T>{
        if(BinNode.IsLChild(x)) x.parent.lc=null;//切断来自父节点的引用 
        else if(BinNode.IsRChild(x)) x.parent.rc=null;//切断来自父节点的引用
        this.updateHeightAbove(x.parent);
        let S:BinTree<T>=new BinTree<T>();
        S._root=x;x.parent=null;
        S._size=x.size();this._size-=S._size;return S;
    }
    /**
     * 释放二叉树
     * @param S 
     */
    private release(S:BinTree<T>){
        
    }
    // //操作器
    // public travLevel<VST>(list:VST){
    //     if(this._root) this._root.travLevel(list);//层次遍历
    // }
    //操作器
    public travPre<VST>(list:(x:BinNode<T>)=>void){
        if(this._root) this._root.travPre(list);//先序遍历
    }
    //操作器
    public travIn<VST>(list:(x:BinNode<T>)=>void){
        if(this._root) this._root.travIn(list);//中序遍历
    }
    //操作器
    public travPost<VST>(list:(x:BinNode<T>)=>void){
        if(this._root) this._root.travPose(list);//后序遍历
    }
    //TODO 比较器
}