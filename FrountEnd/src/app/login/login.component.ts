import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/Authentication.Service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  model: any = {};

  constructor( private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,) { }
    
    ngOnInit() {
          // reset login status
          this.authenticationService.logout();

           // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        }

    


        login(){

          this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              });
          
            }
   }
