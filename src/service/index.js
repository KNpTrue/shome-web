import store from '@/store'
import mapState from 'vuex'

class Service {
  constructor (passwd, state) { //构造函数
    this.webSocket = new WebSocket("ws://192.168.1.108:8001", passwd);
    this.state = state;
    this.webSocket.onopen = function() {
      this.state.online = true;
      alert("连接成功...");
    };
    this.webSocket.close = function() {
      this.state.online = false;
        alert("连接断开...");
    };
    this.webSocket.onmessage = function(event) {
        var recv_msg = event.data;
        alert(recv_msg);
    };
  }
}

export default Service;