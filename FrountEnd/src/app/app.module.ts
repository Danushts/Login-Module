import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRouteModule } from './app.route.module';
import { UserServiceService } from './user-service.service';
import { TestcaseComponent } from './testcase/testcase.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TestcaseComponent
  ],
  imports: [
  

  FormsModule,
    BrowserModule,
    AppRouteModule,
    HttpModule
  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
