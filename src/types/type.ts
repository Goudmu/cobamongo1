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