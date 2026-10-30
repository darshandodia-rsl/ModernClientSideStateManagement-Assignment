export type Product = {
    id: string;
    name: string;
    price: number;
}

export type CartItem = Product & { quantity: number }

export type CheckoutResult = {
    id: string;
    items: CartItem[];
    total: number;
}