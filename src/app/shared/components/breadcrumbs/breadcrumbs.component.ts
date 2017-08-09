import { Component} from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'cdp-breadcrumbs',
  styleUrls: ['breadcrumbs.styles.css'],
  templateUrl: 'breadcrumbs.tmpl.html'
})
export class BreadcrumbsComponent {
  defaultLinks = [{
    name: 'Courses',
    link : '/list'
  }];
  links : Object[] = [];

  constructor(
    protected router : Router
  ){}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if(val.url === '/list') {
        this.links = this.defaultLinks;
      } else if (val.url === '/login') {
        this.links = [];
      } else if (val.url === '/profile') {
        this.links = [{
          name: 'Profile'
        }];
      } else {
        const links = val.url.split('/').filter(item => item).map(item => ({name : item, link : val.url}));
        this.links= [...this.defaultLinks, ...links];
      }
    });
  }
}
