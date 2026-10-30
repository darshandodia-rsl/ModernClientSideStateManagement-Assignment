import type { Product } from "../types/cart";

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
    const response = await fetch("/api/products", { signal });
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products: Product[] = await response.json();
    return products;
}