import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { url } from '../../../socketConfig';


export class ChatService {
  private url = url;
  private socket;

  openConnection() {
    this.socket = io(this.url);
  }

  sendMessage(message){
    this.socket.emit('from-user-message', message);
  }

  getMessages(user) {
    const observable = new Observable(observer => {
      this.socket.on(`message.${user}`, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getAdminStatus() {
    const observable = new Observable(observer => {
      this.socket.on('admin', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  closeConnection() {
    this.socket.disconnect();
  }
}
