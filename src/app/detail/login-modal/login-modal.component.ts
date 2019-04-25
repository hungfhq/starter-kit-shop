import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Logger, AuthenticationService } from '@app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomService } from '@app/custom.service';

const log = new Logger('Login pop up');

@Component({
  selector: 'app-ngbd-login-modal',
  templateUrl: './login-modal.component.html',
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class NgbdLoginModalComponent implements OnInit {
  version: string = environment.version;
  error: string;
  loginForm: FormGroup;
  isLoading = false;
  modalReference: any;
  users: Array<any[]>;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private service: CustomService
  ) {
    // customize default values of modals used by this component tree
    // config.backdrop = 'static';
    config.keyboard = true;
    this.createForm();
  }
  ngOnInit() {
    this.service.getUsers().subscribe(_user => {
      this.users = _user;
    });
  }

  open(content: any) {
    this.modalReference = this.modalService.open(content);
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
            this.route.queryParams.subscribe(
              _params => {
                this.modalReference.close();
                return this.router.navigate(['/wishlist'], { replaceUrl: true });
              }
              //  this.router.navigate([params.redirect || '/'], { replaceUrl: true })
            );
          }
        },
        error => {
          log.debug(`Login error: ${error}`);
          this.error = error;
        }
      );
    console.log('do login');
  }

  createForm() {
    if (localStorage.credentials) {
      this.loginForm = this.formBuilder.group({
        username: [JSON.parse(localStorage.credentials).username, Validators.required],
        password: [JSON.parse(localStorage.credentials).password, Validators.required],
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
