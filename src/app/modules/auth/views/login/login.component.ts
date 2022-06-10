import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFormData } from 'src/app/models/auth';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;


  constructor(fb: FormBuilder, private authService: AuthService) {
    this.loginForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit')
    if (this.loginForm.invalid) return;
    const data: LoginFormData = this.loginForm.value
    console.log(data)
    this.authService.login(data);
  }

}
