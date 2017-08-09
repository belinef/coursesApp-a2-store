import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CourseComponent } from './course-item/course-item.component';
import { CourseManipulationComponent } from './course-item/manipulation/manipulation.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvailableListComponent } from './available';
import { SubscribedListComponent } from './subscribed';
import { CreatedListComponent } from './created';
import { ToBeApprovedListComponent } from './toBeApproved';
import {RouterModule} from "@angular/router";

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [ AvailableListComponent, SubscribedListComponent, CreatedListComponent,CourseComponent, CourseManipulationComponent, ToBeApprovedListComponent ],
  exports:      [ AvailableListComponent, SubscribedListComponent, CreatedListComponent, ToBeApprovedListComponent ],
  providers:    []
})
export class ListsModule { }
