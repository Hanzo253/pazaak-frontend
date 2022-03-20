import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() userName: any;
  @Input() emailAddress: any;
  @Input() password: any;

  private newUser: any;

  constructor(private userService: UserService) { }

  registerNewUser() {
    // this.newUser = {
    //   'userName' : `${this.userName}`,
    //   'emailAddress' : `${this.emailAddress}`,
    //   'password' : `${this.password}`
    // };
    console.log(this.userName);
    console.log(this.emailAddress);
    console.log(this.password);
    
    // this.userService.register(this.newUser).subscribe(
    //   (response) => console.log(response)
    // );
  }

  onSubmit() {

  }

  ngOnInit(): void {
  }

}
