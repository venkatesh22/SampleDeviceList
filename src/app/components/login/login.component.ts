import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isInvalid: boolean;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  signIn(username, password) {
    if (username && password) {
      this.authService.login(username, password).subscribe((resp) => {
        this.isInvalid = false;
        if (resp.status === 200) {
          this.authService.setToken(resp.body);
          this.router.navigate(['/welcome']);
        } else {
          this.isInvalid = true;
        }
      }, (error) => {
        console.log(error);
      });
    }
  }
}
