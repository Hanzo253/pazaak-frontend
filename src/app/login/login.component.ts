import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() email: any;
  @Input() password: any;

  user: any;

  constructor(private router: Router, private userService: UserService) { }

  loginUser() {
    this.user = {
      'email' : `${this.email}`,
      'password' : `${this.password}`
    };
    console.log(this.email);
    console.log(this.password);
    
    this.userService.login(this.user).subscribe(
      (response) => {
        const token = response['jwt'];
        localStorage.setItem('token', `${token}`);
        console.log(response);
        console.log(token);
        this.userService.userAuthToken = token;
        this.router.navigate(['mainmenu']);
      },
      (error: any) => {
        alert(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
