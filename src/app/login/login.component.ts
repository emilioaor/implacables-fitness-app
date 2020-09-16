import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  loading = false;
  form: FormGroup;
  submitted = false;
  authError = false;
  subscription: Subscription;

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private loginService: LoginService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.subscription = this.form.valueChanges.subscribe(res => this.authError = false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;
    this.authError = false;

    if (this.form.valid && ! this.loading) {
      this.loading = true;

      this.loginService.login(this.form.get('email').value, this.form.get('password').value).subscribe(res => {

        if (res.success) {

          window.setTimeout(() => {
            this.loading = false;
            this.form.get('email').setValue('');
            this.form.get('password').setValue('');
            this.submitted = false;
          }, 2000);
          this.router.navigate(['/member/dashboard']);

        } else {
          this.loading = false;
          this.authError = true;
        }

      }, err => {
        console.log('Error', err);
        this.loading = false;
        this.authError = true;
      });
    }
  }
}
