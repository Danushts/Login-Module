import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './Auth Gate/Auth Guard';

import { appConfig } from './app.config';

const routes : Routes=[
   
  
    { path: '', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'login', component:LoginComponent, canActivate: [AuthGuard]  },
    { path : 'signup', component:SignupComponent, canActivate: [AuthGuard] } 
    
]

@NgModule({
  imports: [
    
    RouterModule.forRoot(routes),
    CommonModule, 
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRouteModule { }
