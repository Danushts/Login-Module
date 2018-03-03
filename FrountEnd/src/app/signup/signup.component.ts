import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/User.service'

@Component({
  moduleId: module.id,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model: any = {};

  constructor( private router: Router,
        private userService: UserService,) { }

  ngOnInit() {
  }

  register() {

    this.userService.create(this.model)
    .subscribe(
        data => {
            alert("Registration successful");
            this.router.navigate(['/login']);
        },
      Error =>{
        alert("Getting error in registration");
      });

  }
}
