/**
 * socket连接类
 * 具体数据处理交给BaseMsg
 */
class Socket extends SingtonClass{
    private _webSocket:egret.WebSocket;
    private _connected:boolean;
    private url:string;
    private port:number;
    private msg:egret.ByteArray;//收发消息数据保存
    //封装解析器
    private msger:BaseMsg;
    constructor(){
        super();
    }
    public setMager(msger:BaseMsg):void{
        this.msger=msger;
    }
    /**
     * 建立连接
     * @param url 地址
     * @param port 端口
     */
    public openSocket(url:string="echo.websocket.org",port:number=80):void{
        if(this._connected) return;
        if(!this._webSocket){
            this.url=url;
            this.port=port; 
            this._webSocket=new egret.WebSocket();
            this._webSocket.type=egret.WebSocket.TYPE_BINARY
            this._webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this._webSocket.addEventListener(egret.Event.CONNECT,this.onSocketOpen,this);
        }
        this._webSocket.connect(url,port);
    }
    //连接服务器成功
    private onSocketOpen():void{
        console.log("连接服务器成功")
        this._connected=true;
        if(this._webSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)){
            this._webSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        }
        this._webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,this.onReceiveMessage,this);
        this._webSocket.addEventListener(egret.Event.CLOSE, this.onDisconnect, this);
    }
    public onSend(cmd:number,action:string):void{
        if(!this._connected) return;
        this.msger.encode(this.msg,cmd,action);
        this._webSocket.writeBytes(this.msg);
    }
    private onReceiveMessage(e:egret.ProgressEvent):void{
        this._webSocket.readBytes(this.msg);
        let message:any=this.msger.decode(this.msg);
        //下发消息
    }
    //连接断开
    private onDisconnect(e:egret.Event){
        this._connected=false;
        this.tryConnect();
    }
    private tryConnect(){
        if(!this._connected){
            console.log("与服务器的连接断开,正在尝试重连...");
            this.openSocket(this.url,this.port);
            egret.setTimeout(this.tryConnect,this,1500);
        }
    }
    //连接IO错误
    private onIOError(e:egret.IOErrorEvent){

    }
}