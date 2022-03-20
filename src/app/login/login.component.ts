import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() email: any = "";
  @Input() password: any;

  constructor() { }

  loginUser() {
    console.log(this.email);
    console.log(this.password);
    
  }

  onSubmit() {

  }

  ngOnInit(): void {
  }

}
