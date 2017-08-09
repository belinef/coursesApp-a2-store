import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from "@ngrx/store";
import { loginActions } from '../Store/actions';

@Component({
  selector: 'cdp-login',
  styleUrls: [ './login.styles.css' ],
  templateUrl: "login.component.tmpl.html"
})
export class LoginComponent {

  public login$: any;
  public form = {
    userName: {
      value: '',
      valid: true,
      initial: false
    },
    userPassword: {
      value: '',
      valid: true,
      initial: false
    },
    valid: false,
    loginIsValid: true
  };

  constructor(
    protected router : Router,
    protected store: Store<any>
  ) {
    this.login$ = this.store.select('login');
  }

  ngOnInit() {
    this.login$.subscribe(
      ({logged, name}) => {
        if(logged && name !== 'admin') {
          this.router.navigate(['/list'])
        } else if (logged && name === 'admin') {
          this.router.navigate(['/approve'])
        }
      },
      error => console.log(error),
      () => this.login$.unsubscribe()
    )
  }

  submitForm($event: any): void {
    const {
      userName : {value : user},
      userPassword : {value : password}
    } = this.form;

    $event.preventDefault();

    this.store.dispatch(new loginActions.fetchLoginAction({user, password}));
  }

  validateForm(): void {
    this.form.valid = this.form.userName.initial &&
      this.form.userPassword.initial &&
      this.form.userName.valid &&
      this.form.userPassword.valid;
  }

  validateInput(inputType: string): void {
    if (!this.form[inputType].initial) {
      this.form[inputType].initial = true;
    }

    this.form[inputType].value ? this.form[inputType].valid = true : this.form[inputType].valid = false;

    this.validateForm();
  }
}
