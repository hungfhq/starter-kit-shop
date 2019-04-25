import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User, Product } from './interfaces';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomService {
  itemsCollection: AngularFirestoreCollection<any[]>;
  items$: Observable<any[]>;
  itemDoc: AngularFirestoreDocument<any>;
  editableUser: User;
  editableProduct: Product;

  constructor(private afs: AngularFirestore, private router: Router) {}

  getProducts(): Observable<Product[]> {
    this.itemsCollection = this.afs.collection('products', ref => ref.orderBy('pid', 'asc'));
    this.items$ = this.itemsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.items$;
  }

  getCategories(): Observable<any[]> {
    this.itemsCollection = this.afs.collection('categories', ref => ref.orderBy('link', 'asc'));
    this.items$ = this.itemsCollection.valueChanges();
    return this.items$;
  }

  getUsers(): Observable<any[]> {
    this.itemsCollection = this.afs.collection('users');
    this.items$ = this.itemsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.items$;
  }

  checkExistedUser(users: any[], username: string, password: string) {
    let user: User;
    password = sha256(password);
    user = users.find(u => u.username === username);
    if (user) {
      if (user.password === password) {
        return true;
      }
    }
    return false;
  }

  updateUser(item: any) {
    this.itemDoc = this.afs.doc(`users/${item.id}`);
    this.itemDoc.update(item);
  }

  updateProduct(item: any) {
    this.itemDoc = this.afs.doc(`products/${item.id}`);
    this.itemDoc.update(item);
  }

  addItemToWishlist = (productId: string) => {
    if (this.editableUser) {
      this.editableUser.wishlist.push(productId);
      this.updateUser(this.editableUser);
    }
  };

  removeItemOutOfWishlist(productId: string) {
    if (this.editableUser) {
      this.editableUser.wishlist.splice(this.editableUser.wishlist.indexOf(productId), 1);
      this.updateUser(this.editableUser);
    }
  }

  isExistedInWishlist(productId: string) {
    if (this.editableUser) {
      if (productId) {
        return this.editableUser.wishlist.find((x: string) => x === productId);
      }
    }
  }
  // Handle wishedby array of a product
  addUserToWished(userId: string) {
    if (this.editableProduct) {
      this.editableProduct.wishedby.push(userId);
      console.log('add user to wished');
      this.updateProduct(this.editableProduct);
    }
  }

  removeItemOutOfWished(userId: string) {
    if (this.editableProduct) {
      this.editableProduct.wishedby.splice(this.editableProduct.wishedby.indexOf(userId), 1);
      console.log('remove out of wished');
      this.updateProduct(this.editableProduct);
    }
  }

  isExistedOnWished(userId: string) {
    if (this.editableProduct) {
      if (userId) {
        return this.editableProduct.wishedby.find((u: string) => u === userId);
      }
    }
  }

  toggleWishlistButton(productId: string) {
    if (this.isExistedInWishlist(productId)) {
      this.removeItemOutOfWishlist(productId);
      console.log('removed');
    } else {
      this.addItemToWishlist(productId);
      console.log('added');
    }
  }
  // toogleWishlist and remove item out of wishlist
  toggleWishlistButton2(userId: string, productId: string) {
    console.log(`toggleWislist`, userId, productId);
    if (this.editableProduct && this.editableUser) {
      if (this.isExistedInWishlist(productId)) {
        this.removeItemOutOfWishlist(productId);
        this.removeItemOutOfWished(userId);
        console.log(`removed pid ${productId} and uid ${userId}`);
      } else if (!this.isExistedOnWished(userId)) {
        this.addItemToWishlist(productId);
        this.addUserToWished(userId);
        console.log(`added pid ${productId} and uid ${userId}`);
      }
    } else {
      this.router.navigate(['/login'], { replaceUrl: true });
    }
  }

  getProductById(productId: string) {
    this.getProducts().subscribe(_products => {
      this.editableProduct = _products.find(p => p.pid === productId);
      // console.log(this.editableProduct);
    });
  }
  // // contain = (searchStr: string, str: string) => {
  // //   return new RegExp(searchStr).test(str);
  // // };

  // isLinkExisted = (link?: string) => {
  //   let existed;
  //   existed = this.getData().products.find((p: { link: string }) => link.includes(p.link));
  //   return existed ? true : false;
  // }

  // isCategoryExisted = (categoryLink?: string) => {
  //   let existed;
  //   existed = this.getData().products.find((p: { clink: string }) => categoryLink.includes(p.clink));
  //   return existed ? true : false;
  // }

  // isBrandExisted = (brandLink?: string) => {
  //   let existed;
  //   existed = this.getData().products.find((p: { blink: string }) => brandLink.includes(p.blink));
  //   return existed ? true : false;
  // }
}
