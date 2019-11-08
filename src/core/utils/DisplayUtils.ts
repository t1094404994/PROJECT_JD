/**
 * 显示对象工具类
 * 使用物理引擎,所有父显示对象的锚点都必须居中
 */
class DisplayUtils{
    /**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    public static createBitmap(resName: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    }

    /**
     * 创建一个textField
     * @param size;
     * @param color;
     * @param otherParam;
     */
    public static createTextField(size: number = 12, color: number = 0xFFFFFF, otherParam?: {rotation?:number, x?: number, y?: number, width?: number, height?: number, textAlign?: egret.HorizontalAlign, verticalAlign?: egret.VerticalAlign, skewX?:number, skewY?:number, text?:string, bold?:boolean }): egret.TextField {
        let txt: egret.TextField = new egret.TextField();
        txt.size = size;
        txt.textColor = color;
        if (!otherParam) return txt;
        for (let key in otherParam) {
            txt[key] = otherParam[key];
        }
        return txt;
    }

    /**
     * 创建一个位图字体
     */
    public static createBitmapFont(fontName:string): egret.BitmapText{
        let bpFont: egret.BitmapText = new egret.BitmapText();
        bpFont.font = RES.getRes(fontName);
        return bpFont;
    }

    /**
     * 创建一张Gui的图片
     * @param resName
     * @returns {egret.Bitmap}
     */
    public static createEuiImage(resName: string): eui.Image {
        var result: eui.Image = new eui.Image();
        var texture: egret.Texture = RES.getRes(resName);
        result.source = texture;
        return result;
    }

    /**
     * 创建一个EUI方块
     * @param w 宽
     * @param h 高
     * @param x 中心的位置
     * @param y 中心的位置
     */
    public static createRect(w:number,h:number,x:number,y:number,color:number=0x000000):eui.Rect{
        let rect:eui.Rect=new eui.Rect(w,h,color);
        rect.anchorOffsetX=w>>1;
        rect.anchorOffsetY=h>>1;
        rect.x=x;
        rect.y=y;
        return rect;
    }
    
    /**
     * 通过矢量绘图创建一个圆
     * @param r 半径
     * @param x 中心的位置
     * @param y 中心的位置
     * @param color 填充色
     * @param line 圆的线条粗细
     */
    public static cerateCircle(r:number,x:number,y:number,color:number=0x000000,line:number=0):egret.Shape{
        let shape:egret.Shape=new egret.Shape();
        let post:number=line>>1;
        shape.graphics.lineStyle(line,0x000000);
        shape.graphics.beginFill(color);
        shape.graphics.drawCircle(r+post,r+post,r);
        shape.graphics.moveTo(r+post,r+post);
        shape.graphics.lineTo(2*r+line,r+post);
        shape.graphics.endFill();
        shape.anchorOffsetX=shape.width>>1;
        shape.anchorOffsetY=shape.height>>1;
        shape.x=x;
        shape.y=y;
        return shape;
    }
    /**
     * 从父级移除child
     * @param child
     */
    public static removeFromParent(child: egret.DisplayObject) {
        if (child.parent == null)
            return;

        child.parent.removeChild(child);
    }

    /**
     * 添加到指定容器
     * @param child
     * @param parent
     */
    public static addChild(child: egret.DisplayObject, parent: egret.DisplayObjectContainer) {
        if (!child || !parent) return;
        parent.addChild(child);
    }

    /**
     * 创建多边形
     */
    public static ceratePolygon(pts:Array<Array<number>>,x?:number,y?:number):egret.Shape{
        let shape:egret.Shape=new egret.Shape();
        let pt:Array<number>;
        let l:number=pts.length;
        //开始连线
        shape.graphics.lineStyle(3,0xFF0000);
        shape.graphics.beginFill(0x000000);
        for(let i=1;i<l;i++){
            pt=pts[i-1];
            shape.graphics.moveTo(pt[0],pt[1]);
            pt=pts[i];
            shape.graphics.lineTo(pt[0],pt[1]);
        }
        //首尾闭合
        pt=pts[l-1];
        shape.graphics.moveTo(pt[0],pt[1]);
        pt=pts[0];
        shape.graphics.lineTo(pt[0],pt[1]);
        shape.graphics.endFill();
        //锚点,位置
        shape.anchorOffsetX=shape.width>>1;
        shape.anchorOffsetY=shape.height>>1;
        shape.x=x;
        shape.y=y;
        return shape;
    }
    /**
     * 数组点集统一转化
     * @param 点集
     * @param 物理世界高度
     */
    public static pointToArr(ePath:Array<Array<number>>,hi:number):Array<Array<number>>{
        let path:Array<Array<number>>=[];
        let l:number=ePath.length;
        let p:egret.Point;
        for(let i=0;i<l;i++){
            p=PhysicsUtils.epToPp(ePath[i][0],ePath[i][1],hi);
            path.push([p.x,p.y]);
            egret.Point.release(p);
        }
        return path;
    }
}