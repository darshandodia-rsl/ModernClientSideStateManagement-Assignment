import { create } from 'zustand';
import { createOrder } from '../api/orders';
import type { CartItem, Product } from '../types/cart';

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error';

interface CartStoreState {
    items: CartItem[];
    status: CheckoutStatus;
    error: string | null;

    // Actions                                                                 
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    checkout: () => Promise<void>;
    resetStatus: () => void;
    clearCart: () => void; 
}

export const useCartStore = create<CartStoreState>((set, get) => ({
    items: [],
    status: 'idle',
    error: null,

    addItem: (product: Product) => {
        set((state) => {
            const existing = state.items.find((item) => item.id === product.id);
            if (existing) {
                return {
                    items: state.items.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    // Reset status on new changes if previously completed             
                    status: state.status === 'success' ? 'idle' : state.status,
                };
            }
            return {
                items: [...state.items, { ...product, quantity: 1 }],
                status: state.status === 'success' ? 'idle' : state.status,
            };
        });
    },

    removeItem: (id: string) => {
        set((state) => ({
            items: state.items.filter((item) => item.id !== id),
        }));
    },

    checkout: async () => {
        const currentItems = get().items;
        if (currentItems.length === 0) return;

        // Derived total inside action                                           
        const total = currentItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        set({ status: 'submitting', error: null });

        try {
            await createOrder({ items: currentItems, total });
            // On success: clear cart and transition status                        
            set({ items: [], status: 'success', error: null });
        } catch (err) {
            set({
                status: 'error',
                error: err instanceof Error ? err.message : 'Checkout failed',
            });
        }
    },

    resetStatus: () => set({ status: 'idle', error: null }),

    clearCart: () => set({ items: [] }),
}));

// Derived Selectors (Pure functions, NOT duplicated stored state)           
export const selectTotalPrice = (state: CartStoreState) =>
    state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectTotalCount = (state: CartStoreState) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0);