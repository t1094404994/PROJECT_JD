class SocketEvent {

    /**
     *  掉线
     */
    public static SERVER_DISCONNECT:string='server_disconnect';

    /**
     * 连线成功
     */
    public static SERVER_CONNECT_SUCCESS:string="server_connect_success";

    /**
     * 连线失败
     */
    public static SERVER_CONNECT_FAIL:string="server_connect_fail";

    /**
     * 命令解析错误
     */
    public static SERVER_ERROR_PARSE:string="server_error_parse";

    /**
     * 服务端权限错误
     */
    public static SERVER_ERROR_POWER:string="server_error_power";

    /**
     * 验证码错误
     */
    public static SERVER_ERROR_CODE_AUTH_ERROR:string="server_error_code_auth_error";

    /**
     * 登录人数过多
     * */
    public static SERVER_ERROR_USER_TOO_MANY:string="server_error_user_too_many";

    /**
     * 发送消息过多
     * */
    public static SERVER_ERROR_SEND_TOO_MANY:string="server_error_send_too_many";

    /**
     * 未知错误
     */
    public static SERVER_ERROR_NO:string="server_error_no";
}