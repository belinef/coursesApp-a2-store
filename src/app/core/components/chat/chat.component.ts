import {Component, OnDestroy, OnInit} from "@angular/core";
import {ChatService} from "./chat.service";
import {Store} from "@ngrx/store";

import {CloseChat, OpenChat, AdminStateChange, AdminMessage} from './chat.actions'

@Component({
  selector: 'chat',
  styleUrls: [
    './chat.css'
  ],
  templateUrl: './chat.html'
})
export class ChatComponent {
  public connection;
  public message;
  public chat;
  public subscribtion = [];
  public user: string;

  constructor(private chatService: ChatService,
              protected store: Store<any>) {
  }

  onChange(value) {
    this.message = value;
  }

  sendMessage(e) {
    e.preventDefault();
    if(this.message.trim()) {
      this.chatService.sendMessage(this.message);
      this.message = '';
    }
  }

  ngOnInit() {
    this.chatService.openConnection();

    const sub0 = this.store.select('chat').subscribe(
      chat => this.chat = chat
    );

    const sub4 = this.store.select('login').subscribe(
      ({name}) => this.user = name
    );

    const sub1 = this.chatService.getAdminStatus().subscribe(
      ({online}) => {
        this.store.dispatch(new AdminStateChange(online))
      }
    );

    const sub2 = this.chatService.getMessages(this.user).subscribe(message => {
      this.store.dispatch(new AdminMessage(message))
    });

    this.subscribtion.push(sub0, sub1, sub2);
  }

  openChat() {
    this.store.dispatch(new OpenChat());
  }

  closeChat() {
    this.store.dispatch(new CloseChat());
  }

  ngOnDestroy () {
    this.chatService.closeConnection();
    this.subscribtion.forEach(sub => sub.unsubscribe());
  }
}
