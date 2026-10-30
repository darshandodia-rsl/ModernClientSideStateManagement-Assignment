import type { CartItem } from "../types/cart";
import { CartItemsList } from "./CartItemsList";

interface CartDrawerProps {
    items: CartItem[];
    totalPrice: number;
    onRemoveItem: (id: string) => void;
    onCheckout?: () => void;
}

export function CartDrawer({
    items,
    totalPrice,
    onRemoveItem,
    onCheckout,
}: CartDrawerProps) {
    return (
        <aside className="cart-drawer">
            <h2> Your Cart </h2>

            <div className = "cart-drwer-content">
                <CartItemsList items={items} onRemoveItem={onRemoveItem} />
            </div>

            <div className="cart-footer">
                <div className="cart-total-row">
                    <span>Total:</span>
                    <span className="cart-total-amount">${totalPrice.toFixed(2)}</span>
                </div>

                <button
                    type="button"
                    className="checkout-btn"
                    onClick={onCheckout}
                    disabled={items.length === 0}
                >
                    Checkout
                </button>
            </div>
        </aside>
    );
}