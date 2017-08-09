import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AvailableListComponent } from './common/list/available';
import { SubscribedListComponent } from './common/list/subscribed';
import { CreatedListComponent } from './common/list/created';
import { ToBeApprovedListComponent } from './common/list/toBeApproved';
import { CourseDetailsComponent } from './common/details/details.component';
import { EditComponent } from './common/edit-create/edit/edit.component';
import { CreateComponent } from './common/edit-create/create/create.component';
import { UserProfileComponent } from './common/profile/profile.component';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: AvailableListComponent },
  { path: 'list',  component: AvailableListComponent },
  { path: 'created',  component: CreatedListComponent },
  { path: 'subscribed',  component: SubscribedListComponent },
  { path: 'approve',  component: ToBeApprovedListComponent },
  { path: 'details/:id', component: CourseDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'new', component: CreateComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '**',    component: NoContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
