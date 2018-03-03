import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User();
  statusCode: number;
  constructor(private _auth: UserServiceService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  signUp() {
    this._auth.register(this.user)
      .subscribe(res => {
        this.statusCode = res;
      },
        err => this.statusCode = err
    );

  }

  goBack(){
    this.router.navigate(['/login']);
  }

}
