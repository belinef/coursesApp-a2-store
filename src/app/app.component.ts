/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewContainerRef
} from '@angular/core';

import { Router } from '@angular/router';
import {ToasterService, ToasterConfig} from 'angular2-toaster';
import {Store} from "@ngrx/store";
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.tmpl.html'
})
export class AppComponent implements OnInit {
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';
  public toasterConfig : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    tapToDismiss: true,
    timeout: 1500
  });
  public login;

  constructor(
    protected router : Router,
    protected toasterService: ToasterService,
    protected store: Store<any>,
    protected overlay: Overlay,
    protected vcRef: ViewContainerRef
  ) {
    overlay.defaultViewContainer = vcRef;
  }

  public ngOnInit() {
    this.store.select('login').subscribe((login: any) => {
      this.login = login;
      if(!login.logged) {
        this.router.navigate(['login']);
      }
    });

    this.store.select('notification').subscribe(({ show,type, message: title}) => {
      if(show) {
        this.toasterService.pop({type, title});
      }
    })
  };
}
