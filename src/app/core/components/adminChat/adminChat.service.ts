import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { url } from '../../../socketConfig';

export class AdminChatService {
  private url = url;
  private socket;
  private sendTo:string;

  openConnection() {
    this.socket = io(this.url);
  }

  sendMessage(message){
    this.socket.emit('from-admin-message', {message, sendTo: this.sendTo});
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket.on(`message`, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getAdminMessages() {
    const observable = new Observable(observer => {
      this.socket.on(`message.from.admin`, (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getUsers() {
    const observable = new Observable(observer => {
      this.socket.on('usersOnline', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  sendMessageTo(user) {
    this.sendTo = user;
  }

  closeConnection() {
    this.socket.disconnect();
  }
}
