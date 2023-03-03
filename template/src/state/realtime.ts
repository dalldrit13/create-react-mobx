import { io, Socket } from "socket.io-client";
import { runInAction } from "mobx";

interface ServerToClientEvents {
  // Enter listener events here
  type: (data: any) => void
}

interface ClientToServerEvents {
  // Enter client emit events in here
  hello: () => void;
}

class Realtime {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | false
  state: any

  constructor(state: any) {
    this.state = state
    this.socket = false
    this.connect()
  }

  //________________________Realtime____________________________________________
  connect() {
    this.socket = io(import.meta.env.VITE_APP_SOCKET_URL, { transports: ['websocket'] });

    this.socket.on('type', data => {
      console.log('type', data)
      runInAction(() => {
        this.state.user = data.user
      })
      // Here we can modify state depending on data
    });
  }  
}

export default Realtime