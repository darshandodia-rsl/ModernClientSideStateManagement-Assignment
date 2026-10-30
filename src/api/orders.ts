import type { CartItem, CheckoutResult } from '../types/cart';

export interface CreateOrderPayload {
    items: CartItem[];
    total: number;
}

export async function createOrder(payload: CreateOrderPayload, signal?: AbortSignal): Promise<CheckoutResult> {
    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal,
    });

    if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
    }

    const order: CheckoutResult = await response.json();
    return order;
}