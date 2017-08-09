import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoursesService } from './services/courses/courses.service';
import { LoginService } from './services/login/login.service';
import { AuthorsService } from './services/authors/authors.service';
import { ProfileService } from './services/profile/profile.service';
import { ChatService } from './components/chat/chat.service';
import { AdminChatService } from './components/adminChat/adminChat.service';

import * as components from './components';
import {SharedModule} from "../shared/shared.module";

let componentsArray = Object.keys(components).map(c => components[c]);

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    FormsModule
  ],
  declarations: [ ...componentsArray ],
  exports:      [ ...componentsArray ],
  providers:    []
})

// If you need to add provider for the whole app as a singletone or such components as footer, header, sidebar etc. use this module
export class CoreModule {

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
          'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ CoursesService, LoginService, AuthorsService, ChatService, AdminChatService, ProfileService]
    };
  }
}
