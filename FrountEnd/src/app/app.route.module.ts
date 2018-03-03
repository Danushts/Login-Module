import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TestcaseComponent } from './testcase/testcase.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: TestcaseComponent }

]

@NgModule({
  imports: [

    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRouteModule { }
