import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger, I18nService, AuthenticationService } from '@app/core';
import { CustomService } from '@app/custom.service';

import SimpleCrypto from 'simple-crypto-js';

const secretKey = 'secret';
const simpleCrypto = new SimpleCrypto(secretKey);

const log = new Logger('Login');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;
  saved: string;
  users: Array<any[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private i18nService: I18nService,
    private authenticationService: AuthenticationService,
    private service: CustomService
  ) {
    this.createForm();
  }

  ngOnInit() {
    if (this.authenticationService.isAuthenticated()) {
      this.router.navigate(['/wishlist'], { replaceUrl: true });
    }

    this.service.getUsers().subscribe(_user => {
      this.users = _user;
    });

    // console.log('credentials ' + this.authenticationService.credentials);
    // console.log('isAuthenticated ' + this.authenticationService.isAuthenticated());
  }

  login() {
    if (!this.service.checkExistedUser(this.users, this.loginForm.value.username, this.loginForm.value.password)) {
      this.loginForm.setValue({ username: '', password: '', remember: false });
    }
    this.isLoading = true;
    this.authenticationService
      .login(this.loginForm.value)
      .pipe(
        finalize(() => {
          this.loginForm.markAsPristine();
          this.isLoading = false;
        })
      )
      .subscribe(
        credentials => {
          if (`${credentials.username}` === '') {
            this.error = ' ';
          } else {
            log.debug(`${credentials.username} successfully logged in`);
            this.route.queryParams.subscribe(_params => {
              return this.router.navigate(['/wishlist'], { replaceUrl: true });
            });
          }
        },
        error => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  private createForm() {
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required],
    //   remember: true
    // });
    if (localStorage.getItem('en_credentials')) {
      // console.log(localStorage.getItem('en_credentials'));
      this.loginForm = this.formBuilder.group({
        username: [JSON.parse(localStorage.getItem('en_credentials')).username, Validators.required],
        password: [
          simpleCrypto.decrypt(JSON.parse(localStorage.getItem('en_credentials')).password),
          Validators.required
        ],
        remember: false
      });
    } else {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember: false
      });
    }
  }
}
