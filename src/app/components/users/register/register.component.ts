import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  public email: string= '';
  public password: string= '';

  ngOnInit() {
  }

  onAddUser() {
    this.authService.registerUser(this.email, this.password)
    .then((res) => {
      this.router.navigate(['admin/list-books']);
    }).catch(err => console.log('err ', err.message));
  }
  
  onLoginGoogle() {
    this.authService.loginGoogleUser()
    .then((res) => {
      // console.log('onLoginGoogle ', res);
      this.onloginRedirect();
    }).catch(err => this.messageError(err));
  }

  onLoginFacebook() {
    this.authService.loginFacebookUser()
    .then((res) => {
      // console.log('onLoginFacebook ', res);
      this.onloginRedirect();
    }).catch(err => this.messageError(err));
  }

  onloginRedirect() {
    this.router.navigate(['admin/list-books']); 
  }
  
  messageError(err) {
    console.log('err ', err.message);
  }
}
