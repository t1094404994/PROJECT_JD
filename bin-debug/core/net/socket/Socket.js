var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * socket连接类
 * 具体数据处理交给BaseMsg
 */
var Socket = (function (_super) {
    __extends(Socket, _super);
    function Socket() {
        return _super.call(this) || this;
    }
    Socket.prototype.setMager = function (msger) {
        this.msger = msger;
    };
    /**
     * 建立连接
     * @param url 地址
     * @param port 端口
     */
    Socket.prototype.openSocket = function (url, port) {
        if (url === void 0) { url = "echo.websocket.org"; }
        if (port === void 0) { port = 80; }
        if (this._connected)
            return;
        if (!this._webSocket) {
            this.url = url;
            this.port = port;
            this._webSocket = new egret.WebSocket();
            this._webSocket.type = egret.WebSocket.TYPE_BINARY;
            this._webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this._webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        }
        this._webSocket.connect(url, port);
    };
    //连接服务器成功
    Socket.prototype.onSocketOpen = function () {
        console.log("连接服务器成功");
        this._connected = true;
        if (this._webSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
            this._webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        }
        this._webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._webSocket.addEventListener(egret.Event.CLOSE, this.onDisconnect, this);
    };
    Socket.prototype.onSend = function (cmd, action) {
        if (!this._connected)
            return;
        this.msger.encode(this.msg, cmd, action);
        this._webSocket.writeBytes(this.msg);
    };
    Socket.prototype.onReceiveMessage = function (e) {
        this._webSocket.readBytes(this.msg);
        var message = this.msger.decode(this.msg);
        //下发消息
    };
    //连接断开
    Socket.prototype.onDisconnect = function (e) {
        this._connected = false;
        this.tryConnect();
    };
    Socket.prototype.tryConnect = function () {
        if (!this._connected) {
            console.log("与服务器的连接断开,正在尝试重连...");
            this.openSocket(this.url, this.port);
            egret.setTimeout(this.tryConnect, this, 1500);
        }
    };
    //连接IO错误
    Socket.prototype.onIOError = function (e) {
    };
    return Socket;
}(SingtonClass));
__reflect(Socket.prototype, "Socket");
