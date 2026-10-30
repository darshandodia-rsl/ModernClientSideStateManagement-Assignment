import type { CartItem, Product } from "../types/cart";

export interface CartState {
    items: CartItem[];
}

export type CartAction = 
| { type: "ADD_ITEM"; payload: Product }
| { type: "REMOVE_ITEM"; payload: { id: String } };

export const initialCartState: CartState = {
    items: []
};

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM": {
            const exisitingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (exisitingItem) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1}
                        : item
                    ),
                };
            }

            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1}],
            };
        }

        case "REMOVE_ITEM": {
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload.id),
            };
        }

        default:
            return state
    }
}