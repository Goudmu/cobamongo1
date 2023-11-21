export type Menu = {
    _id: number;
    title: string;
    desc?: string;
    color: string;
    img?: string;
    cat: string;
    products: Product[]
  }[];

export type Product = {
  _id: number;
  cat: String;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  isFeatured: boolean;
};
export type User = {
  _id: number;
  password: string;
  username: string;
  gmail: string;
  isAdmin: boolean
};

export type ProductOrder = {
  _id: number;
  cat: String;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  isFeatured: boolean;
  qty: number
};

export type OrderType = {
  _id: string;
  gmail: string;
  price: number;
  productsSchema: ProductOrder[];
  status: string;
  createdAt: Date;
  intent_id?: String;
};

// export type ProductTypeLaporan = {
//   _id: string;
//   title: string;
//   desc?: string;
//   img?: string;
//   price: number;
//   options?: { title: string; additionalPrice: number }[];
//   catslug: string;
// };