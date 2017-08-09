import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { SharedModule } from '../../shared/shared.module';
export const ROUTES: Routes = [
  { path: '', component: EditComponent }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(ROUTES), SharedModule ],
  declarations: [ EditComponent, CreateComponent ],
  exports:      [ EditComponent, CreateComponent ],
  providers:    [ ]
})
export class EditCreateModule { }
