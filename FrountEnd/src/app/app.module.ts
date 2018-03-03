import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRouteModule } from './app.route.module';
import { HttpClientModule } from '@angular/common/http'
import { AuthenticationService } from './services/Authentication.Service';
import { UserService } from './services/User.service';
import { JwtInterceptorProvider } from './services/Jwt.Interceptor';
import { AuthGuard } from './Auth Gate/Auth Guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRouteModule,
    HttpModule,
    HttpClientModule
    
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    JwtInterceptorProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
