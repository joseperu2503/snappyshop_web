export interface CreateCartDTO {
  products: {
    id: number;
    quantity: number;
  }[];
}
