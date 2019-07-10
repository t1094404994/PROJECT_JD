interface BaseMsg{
    /**
     * 消息解析
     * @param msg 
     */
    decode(msg:egret.ByteArray):any;
    /**
     * 封装消息
     * @param byteArray 目标
     * @param cmd 模块
     * @param action 行为
     */
    encode(byteArray:egret.ByteArray,cmd:number,action:string):void;
}