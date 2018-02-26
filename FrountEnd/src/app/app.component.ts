import { Component } from '@angular/core';
//import  '../images/logo';
 @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Practice Project';
  private COMPANY_LOGO = require('../Images/logo.png');
}
