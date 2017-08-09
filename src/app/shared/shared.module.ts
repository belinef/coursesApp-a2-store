import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { SwapComponent } from './components/swap';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {BreadcrumbsComponent} from "./components/breadcrumbs/breadcrumbs.component";
import {Router, ActivatedRoute, RouterModule} from "@angular/router";
import { ContentEditable } from './directives/contentEditable/content-editable.directive'

@NgModule({
  imports:      [ CommonModule, HttpModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [ SwapComponent, BreadcrumbsComponent, ContentEditable],
  exports:      [ CommonModule,
    HttpModule,
    SwapComponent,
    BreadcrumbsComponent,
    ContentEditable],
})

// SharedModule exists to make commonly used components, directives and pipes available for use in the templates of components in many other modules.
// Please, use providers carefully
// see https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-module
export class SharedModule { }
