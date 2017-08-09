import {Component, animate, state, style, transition, trigger} from '@angular/core';
import { Store } from "@ngrx/store";
import { loginActions } from '../../../Store/actions'
import {Observable} from "rxjs";

import {
  CloseNavigation, OpenNavigation, FetchCountSubscribed, FetchCountCreated,
  FetchCountApproved
} from './header.actions';

import { FetchProfile } from '../../../common/profile/profile.actions'

@Component({
  selector: 'cdp-header',
  styleUrls: ['./header.style.css'],
  templateUrl: './header.template.html',
  animations: [
    trigger('navigation', [
      state('closed', style({
        'transform': 'scale(0)'
      })),
      state('open', style({
        'height': 'auto',
        'transform': 'scale(1,1)'
      })),
      transition('open => closed', animate('.3s')),
      transition('closed => open', animate('.3s'))
    ])
  ]
})
export class HeaderComponent {
  public login$: Observable<any>;
  public profile$: Observable<any>;
  public navigationState: string = 'closed';
  public counters: any;

  constructor(protected store: Store<any>) {
    this.login$ = this.store.select('login');
    this.store.select('profile').subscribe((profile:any) => {
      this.profile$ = profile.profileData;
    });
    this.store.select('header').subscribe(
      (({navigation, counters}) => {
        Object.assign(this, {counters, navigationState: navigation});
      })
    );

  }

  ngOnInit () {
    this.store.dispatch(new FetchCountSubscribed());
    this.store.dispatch(new FetchCountCreated());
    this.store.dispatch(new FetchCountApproved());
    this.store.dispatch(new FetchProfile());
  }

  userLogOut() {
    this.store.dispatch(new loginActions.logoutAction());
  }

  toggleNavigation() {
    if(this.navigationState === 'closed') {
      this.store.dispatch(new OpenNavigation());
    } else {
      this.store.dispatch(new CloseNavigation());
    }
  }
}
