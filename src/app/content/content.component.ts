import { Component, OnInit } from '@angular/core';
import { CustomService } from '@app/custom.service';
import { Product } from '../interfaces';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  products: Array<Product> = [];
  constructor(
    public service: CustomService,
    public authenticationService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {
    this.service.getProducts().subscribe(_products => {
      this.products = _products;
    });
    if (this.authenticationService.credentials) {
      if (!this.service.editableUser) {
        this.router.navigate(['/wishlist'], { replaceUrl: true });
      }
    }
  }
}
