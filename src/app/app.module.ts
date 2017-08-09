import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Store } from './Store';
import { EffectsModule } from '@ngrx/effects';
import { CoursesEffects } from './Store/effects/courses';
import { AuthorsEffects } from './Store/effects/authors';
import { LoginEffects } from './Store/effects/login';
import { HeaderEffects } from './core/components/header/header.effects';
import { ProfileEffects } from './common/profile/profile.effects';

/* Core Module */
import { CoreModule } from './core/core.module';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*DatePicker*/
import { DatePickerModule } from 'ng2-datepicker';

/*IMG-Cropper*/
import { ImageCropperModule } from 'ng2-img-cropper';

/*
 * Modal
 */
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

/* Shared Module */
import { SharedModule } from './shared/shared.module';
import {ToasterModule} from 'angular2-toaster';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { ListsModule } from './common/list';
import { CourseDetailsModule } from './common/details';
import { EditCreateModule } from './common/edit-create';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';
import { UserProfileModule } from './common/profile';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    NoContentComponent,
    LoginComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    DatePickerModule,
    ImageCropperModule,

    // custom modules
    ListsModule,
    CourseDetailsModule,
    UserProfileModule,
    EditCreateModule,

    CoreModule.forRoot(),
    SharedModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules }),
    Store,
    EffectsModule.run(CoursesEffects),
    EffectsModule.run(AuthorsEffects),
    EffectsModule.run(LoginEffects),
    EffectsModule.run(HeaderEffects),
    EffectsModule.run(ProfileEffects),
    ToasterModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
