import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pazaak-frontend';

  constructor(private userService: UserService) { }

  getUser(): void {
    this.userService.getUser().subscribe(
      (response) => console.log(response)
    );
  }

  ngOnInit(): void {
      this.getUser();
  }
}
