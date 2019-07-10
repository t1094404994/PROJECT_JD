var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * socket消息解析与封装
 */
var TypeMsg = (function () {
    function TypeMsg() {
    }
    /**
     * 消息解析
     * @param msg
     */
    TypeMsg.prototype.decode = function (msg) {
        return msg;
    };
    /**
     * 封装消息
     * @param byteArray 目标
     * @param cmd 模块
     * @param action 行为
     */
    TypeMsg.prototype.encode = function (byteArray, cmd, action) {
        byteArray.writeInt(cmd);
        byteArray.writeUTF(action);
    };
    return TypeMsg;
}());
__reflect(TypeMsg.prototype, "TypeMsg", ["BaseMsg"]);
