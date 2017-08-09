import {Component} from "@angular/core";
import {AdminChatService} from "./adminChat.service";
import {Store} from "@ngrx/store";

import {
  ReceiveMessage,
  CloseUsers,
  OpenUsers,
  OpenChat,
  UsersChanged,
  ReceiveAdminMessage,
  ClearUnreadedMessage,
  UnreadedMessage} from './adminChat.actions'

@Component({
  selector: 'admin-chat',
  styleUrls: [
    './adminChat.css'
  ],
  templateUrl: './adminChat.html'
})
export class AdminChatComponent {
  public messages = [];
  public connection;
  public message;
  public chat;
  public subscribtion = [];
  public user: string;

  constructor(private adminChatService: AdminChatService,
              protected store: Store<any>) {
  }

  onChange(value) {
    this.message = value;
  }

  sendMessage(e) {
    e.preventDefault();
    if(this.message.trim()) {
      this.adminChatService.sendMessage(this.message);
      this.message = '';
    }
  }

  ngOnInit() {
    this.adminChatService.openConnection();

    const sub0 = this.store.select('adminChat').subscribe(
      chat => this.chat = chat
    );

    const sub4 = this.store.select('login').subscribe(
      ({name}) => this.user = name
    );

    const sub1 = this.adminChatService.getUsers().subscribe(
      (usersList: any) => {
        this.store.dispatch(new UsersChanged(usersList))
      }
    );

    const sub2 = this.adminChatService.getMessages().subscribe(({text: message, user}) => {
      if(this.chat.whatToShow !== 'chat') {
        this.store.dispatch(new UnreadedMessage({user}));
      }
      this.store.dispatch(new ReceiveMessage({message, user}));
    });

    const sub3 = this.adminChatService.getAdminMessages().subscribe(({text: message, sendTo}) => {
      this.store.dispatch(new ReceiveAdminMessage({message, sendTo}));
    });

    this.subscribtion.push(sub0, sub1, sub2, sub3);
  }

  whatToshow() {
    const show = {
      list : () => {
        this.store.dispatch(new CloseUsers());
      },
      close : () => {
        this.store.dispatch(new OpenUsers());
      },
      chat : () => {
        this.store.dispatch(new OpenUsers());
      }
    };

    show[this.chat.whatToShow]();
  }

  showChat(user) {
    this.adminChatService.sendMessageTo(user);
    this.store.dispatch(new OpenChat(user));
    this.store.dispatch(new ClearUnreadedMessage({user}));
  }

  ngOnDestroy () {
    this.adminChatService.closeConnection();
    this.subscribtion.forEach(sub => sub.unsubscribe());
  }
}
