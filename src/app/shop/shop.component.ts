import { Component, OnInit } from '@angular/core';
import { CustomService } from '../custom.service';
import { AuthenticationService } from '@app/core/authentication/authentication.service';
import { Router } from '@angular/router';

import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component( {
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: [ './shop.component.scss' ]
} )
export class ShopComponent implements OnInit {
  categories: Array<any[]>;
  products$: Observable<any[]>;
  products: any[];

  public show = 'block';
  private searchTerms = new Subject<string>();

  constructor(
    public service: CustomService,
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.products$ = this.searchTerms.pipe(
      debounceTime( 500 ),
      distinctUntilChanged(),
      switchMap( ( term: string ) => this.searchProducts( term ) )
    );

    this.service.getCategories().subscribe( _categories => {
      this.categories = _categories;
      // console.log(this.categories);
    } );

    this.service.getProducts().subscribe( products => {
      this.products = products;
    } );
  }

  delayBlur() {
    console.log( 'blur' );
    setTimeout( () => {
      this.show = 'none';
    }, 150 );
  }

  search( term: string ): void {
    this.searchTerms.next( term );
  }

  searchProducts( term: string ) {
    if ( !term.trim() ) {
      return of( [] );
    }
    if ( this.products ) {
      return of(
        this.products.filter( p => {
          return p.link.includes( term );
        } )
      );
    }
  }

  logout() {
    this.authenticationService.logout().subscribe( () => this.router.navigate( [ '' ], { replaceUrl: true } ) );
    console.log( 'do logout() on shop' );
  }
}
