import { atom } from 'jotai';
import type { CartItem, Product } from '../types/cart';

// 1. Primitive Atom: stores the cart items                                  
export const cartItemsAtom = atom<CartItem[]>([]);

// 2. Derived Read-Only Atoms (recomputed automatically without useMemo)     
export const totalCountAtom = atom((get) => {
    const items = get(cartItemsAtom);
    return items.reduce((sum, item) => sum + item.quantity, 0);
});

export const totalPriceAtom = atom((get) => {
    const items = get(cartItemsAtom);
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

// 3. Action Write-Only Atoms (components using useSetAtom will NEVER re-render on cart changes)

// Add item or increment quantity                                            
export const addItemAtom = atom(null, (get, set, product: Product) => {
    const items = get(cartItemsAtom);
    const existing = items.find((item) => item.id === product.id);

    if (existing) {
        set(
            cartItemsAtom,
            items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } :
                    item
            )
        );
    } else {
        set(cartItemsAtom, [...items, { ...product, quantity: 1 }]);
    }
});

// Remove item by id                                                         
export const removeItemAtom = atom(null, (get, set, id: string) => {
    const items = get(cartItemsAtom);
    set(
        cartItemsAtom,
        items.filter((item) => item.id !== id)
    );
});

// Clear cart                                                                
export const clearCartAtom = atom(null, (_get, set) => {
    set(cartItemsAtom, []);
}); 