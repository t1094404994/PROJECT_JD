var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketEvent = (function () {
    function SocketEvent() {
    }
    /**
     *  掉线
     */
    SocketEvent.SERVER_DISCONNECT = 'server_disconnect';
    /**
     * 连线成功
     */
    SocketEvent.SERVER_CONNECT_SUCCESS = "server_connect_success";
    /**
     * 连线失败
     */
    SocketEvent.SERVER_CONNECT_FAIL = "server_connect_fail";
    /**
     * 命令解析错误
     */
    SocketEvent.SERVER_ERROR_PARSE = "server_error_parse";
    /**
     * 服务端权限错误
     */
    SocketEvent.SERVER_ERROR_POWER = "server_error_power";
    /**
     * 验证码错误
     */
    SocketEvent.SERVER_ERROR_CODE_AUTH_ERROR = "server_error_code_auth_error";
    /**
     * 登录人数过多
     * */
    SocketEvent.SERVER_ERROR_USER_TOO_MANY = "server_error_user_too_many";
    /**
     * 发送消息过多
     * */
    SocketEvent.SERVER_ERROR_SEND_TOO_MANY = "server_error_send_too_many";
    /**
     * 未知错误
     */
    SocketEvent.SERVER_ERROR_NO = "server_error_no";
    return SocketEvent;
}());
__reflect(SocketEvent.prototype, "SocketEvent");
