import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomService } from '../custom.service';
import { Product } from '@app/interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  products: Array<Product> = [];
  category: any;
  found: any;

  constructor(
    public service: CustomService,
    public authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(para => {
      this.category = para.get('category');
      this.service.getProducts().subscribe(_products => {
        this.products = _products.filter(p => p['clink'] === this.category);
        if (this.products.length === 0) {
          console.log(this.products);
          this.router.navigate(['pagenotfound']);
        }
      });
    });

    if (this.authenticationService.credentials) {
      if (!this.service.editableUser) {
        this.router.navigate(['/wishlist'], { replaceUrl: true });
      }
    }
  }
}
