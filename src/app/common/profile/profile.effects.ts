import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions,
  Effect,
  toPayload
} from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { ActionTypes,
  FetchedProfile,
  ConfirmAvatarImage,
  NameConfirmed,
  BirthDateConfirmed } from './profile.actions';
import { Router } from '@angular/router';

import { ProfileService } from '../../core/services/profile/profile.service';

@Injectable()
export class ProfileEffects {
  private url: string = '/api/profile';  // URL to web API
  constructor(
    private http: Http,
    private actions$: Actions,
    private router : Router,
    private profileService: ProfileService
  ) {}

  @Effect()
  profileFetching$ = this.actions$
    .ofType(ActionTypes.FETCH_PROFILE)
    .switchMap(() =>
      this.profileService.getProfile().map(profile => {
        const originalImage = new Image();

        originalImage.src = profile.avatar.original;
        profile.avatar.original = originalImage;

        return new FetchedProfile(profile);
      }));

  @Effect()
  avatarUpdating$ = this.actions$
    .ofType(ActionTypes.FETCH_AVATAR_CHANGE)
    .map(toPayload)
    .switchMap((avatar) => {
      const result = Object.assign({}, avatar, { original: avatar.original.src});

      return this.profileService.updateProfile('avatar', result).map(() => new ConfirmAvatarImage(result))
            ;});

  @Effect()
  nameUpdating$ = this.actions$
    .ofType(ActionTypes.FETCH_NAME_UPDATE)
    .map(toPayload)
    .switchMap((name) => {
      return this.profileService.updateProfile('name', name).map(() => new NameConfirmed(name))
        ;});

  @Effect()
  dateofBirthUpdating$ = this.actions$
    .ofType(ActionTypes.FETCH_BIRTHDATE_UPDATE)
    .map(toPayload)
    .switchMap(({ data: {formatted} }) => {

      return this.profileService.updateProfile('dateOfBirth', formatted).map(() => new BirthDateConfirmed())
        ;});
}
