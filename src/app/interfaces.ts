export interface User {
  uid: string;
  username: string;
  password: string;
  wishlist: string[];
}

export interface Product {
  pid: string;
  clink: string;
  blink: string;
  link: string;
  price: string;
  img_url: string;
  dsc: string;
  full_dsc: string;
  wishedby: string[];
}
