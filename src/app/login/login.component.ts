import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null;
  @Input() success: string | null;

  allowedUsers = [{ username: 'admin', password: 'admin' }];

  ngOnInit(): void {}

  async submit() {
    var username = this.form.controls['username'].value.toLowerCase();
    var password = this.form.controls['password'].value;

    //Loop through the allowed users
    for (var i = 0; i < this.allowedUsers.length; i++) {
      //Checks if the user exists
      if (this.allowedUsers[i].username === username) {
        //Checks that the password belongs to the user
        if (this.allowedUsers[i].password === password) {
          this.success = 'Logged In';
          this.error = null;
          await this.delay(1000);
          this.router.navigateByUrl('/'); //Navigates to the home page
          break;
        } else {
          //The password is incorrect
          this.success = null;
          this.error = 'Username or password invalid';
          break;
        }
      } else {
        //User does not exist
        this.success = null;
        this.error = 'Username or password invalid';
        break;
      }
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
