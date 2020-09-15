import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loading = false;
  form: FormGroup;
  submitted = false;

  constructor(
      private fb: FormBuilder,
      private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.loading = true;

      window.setTimeout(() => {
        this.loading = false;
        this.submitted = false;
        this.form.get('email').setValue('');
        this.form.get('password').setValue('');
        this.router.navigate(['/member/dashboard']);
      }, 2000);
    }
  }
}
