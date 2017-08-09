import { NgModule } from '@angular/core';
import { UserProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './avatar-manipulation/avatar-manipulation.component';
import { DatePickerModule } from 'ng2-datepicker';
/*IMG-Cropper*/
import { ImageCropperModule } from 'ng2-img-cropper';

@NgModule({
  imports:      [
    BrowserModule,
    SharedModule,
    BootstrapModalModule,
    DatePickerModule,
    ImageCropperModule
  ],
  declarations: [ UserProfileComponent, ConfirmComponent ],
  exports:      [ UserProfileComponent ],
  providers:    [ ],
  entryComponents: [ ConfirmComponent ]
})
export class UserProfileModule { }
