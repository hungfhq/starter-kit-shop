import { Component, OnInit } from '@angular/core';
import { CustomService } from '@app/custom.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { User, Product } from '../interfaces';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishListComponent implements OnInit {
  userName: string;
  user: User;
  wishlist: Array<Product>;
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    public service: CustomService
  ) {}

  ngOnInit() {
    this.userName = this.authenticationService.credentials.username;

    this.service.getUsers().subscribe(_users => {
      this.user = _users.find(u => u['username'] === this.userName);
      this.service.editableUser = this.user;
      this.service.getProducts().subscribe(_products => {
        this.wishlist = [];
        this.service.editableUser.wishlist.map((element: any) => {
          this.wishlist.push(_products.find(p => p.pid === element));
        });
        console.table(this.wishlist);
      });
    });
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/shop'], { replaceUrl: true }));
    console.log('do logout()');
  }
}
