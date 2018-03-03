import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './../user';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  statusCode: number;
  
  constructor(private _auth: UserServiceService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
  }


  login(e) {
    
    //  this.u.email=info.email;
    // this.u.password=info.password;
    e.preventDefault();
     this.user.email = e.target.elements[0].value;
    this.user.password = e.target.elements[1].value;
    console.log(this.user);

    this._auth.login(this.user)
      .subscribe(data => {
        this.statusCode = data;
        console.log(data.token);
        this._auth.storeUserData(data.token, data.user);
        this.goBack();
        // setTimeout(()=>{
        //   this.router.navigate(['/home']);
        // },2000)
      },
        err => this.statusCode = err
      );
  }
  goBack(){
    this.router.navigate(['/dashboard']);
  }


}
