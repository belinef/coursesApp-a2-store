import * as checkPasswordStrength from 'zxcvbn';
import { Component } from '@angular/core';
import { ConfirmComponent } from './avatar-manipulation/avatar-manipulation.component';

import { DialogService } from 'ng2-bootstrap-modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { FetchProfile,
  NameChanging,
  NameChanged,
  BirthDateChanging,
  BirthDateChanged,
  UpdateBirthDateOnServer,
  NameCancel,
  BirthDateCancel,
  ChangeAvatarImage,
  UpdateAvatarOnServer,
  UpdateNameOnServer,
  SetPasswordIsOpen,
  ChangePasswordStrength,
  SetNewPassword,
  SetConfirmPassword} from './profile.actions';

import { DatePickerOptions, DateModel } from 'ng2-datepicker';

enum passWordStrengthDic {
  weak,
  low,
  middle,
  high,
  max
}

const actions = {
    cancel: {
      dateOfBirth: BirthDateCancel,
      name: NameCancel
    },
    confirm: {
      dateOfBirth: UpdateBirthDateOnServer,
      name: UpdateNameOnServer
    },
    start: {
      dateOfBirth: BirthDateChanging,
      name: NameChanging
    },
    change: {
      dateOfBirth: BirthDateChanged,
      name: NameChanged
    }
};

@Component({
  selector: 'cdp-profile',
  styleUrls: ['./profile.styles.css'],
  templateUrl: './profile.tpl.html'
})
export class UserProfileComponent {
  public profile$: any = {};
  private subscriptions: Array<Observable<any>> = [];

  constructor(
    protected dialogService: DialogService,
    protected store: Store<any>
  ) {}

  public ngOnInit() {
    const sub0: any = this.store.select('profile').subscribe(
      (profile) => this.profile$ = profile
    );

    this.store.dispatch(new FetchProfile());

    this.subscriptions.push(sub0);
  }

  get datePickerOptions(): DatePickerOptions {
      return new DatePickerOptions(
        {
          initialDate: new Date(this.profile$.profileData.dateOfBirth)
        }
      );
  }

  public startEdit(target) {
      this.store.dispatch(new actions.start[target]());
  }

  public onValueChange(target, value) {
      this.store.dispatch(new actions.change[target](value));
  }

  public cancelEdit(target) {
      this.store.dispatch(new actions.cancel[target]());
  }

  public confirm(action) {
      this.store.dispatch(new actions.confirm[action](this.profile$.editedData[action]));
  }

  public onImageChanged(imageData) {
    this.store.dispatch(new ChangeAvatarImage(imageData));
  }

  public openAvatarEditPopUp(current) {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      onImageChange: this.onImageChanged.bind(this),
      avatar: current ? Object.assign({}, this.profile$.profileData.avatar) : {},
      edit: current
    })
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.store.dispatch(new UpdateAvatarOnServer(this.profile$.editedData.avatar));
        }

        disposable.unsubscribe();
      });
  }

  public ngOnDestroy() {
      this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public togglePasswordForm() {
    const { passwordForm: { isOpen } } = this.profile$;

    this.store.dispatch(new SetPasswordIsOpen(!isOpen));
  }

  public onNewPassChange(value) {
    const { score } = value ? checkPasswordStrength(value) : { score: 'empty'};

    this.store.dispatch(new ChangePasswordStrength(passWordStrengthDic[score]));
    this.store.dispatch(new SetNewPassword(value));
  }

  public checkPassword(value) {
    this.store.dispatch(new SetConfirmPassword(value));
  }

  public isPasswordsDifferend() {
    const { passwordForm: { newPass, confirmPass } } = this.profile$;

    return newPass !== confirmPass;
  }
}
