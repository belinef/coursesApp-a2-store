import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseDetailsComponent } from './details.component';

import { BrowserModule } from '@angular/platform-browser';
export const ROUTES: Routes = [
  { path: '', component: CourseDetailsComponent }
];

@NgModule({
  imports:      [ BrowserModule, RouterModule.forChild(ROUTES) ],
  declarations: [ CourseDetailsComponent ],
  exports:      [ CourseDetailsComponent ],
  providers:    [ ]
})
export class CourseDetailsModule { }
