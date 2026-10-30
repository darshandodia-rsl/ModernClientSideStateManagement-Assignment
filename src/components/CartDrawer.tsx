import { useCartState } from '../context/CartContext';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
    const { items } = useCartState();
    const totalPrice = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <aside className="cart-drawer">
            <h2>Your Cart</h2>
            <div className="cart-drawer-content">
                <CartItemsList />
            </div>
            <div className="cart-footer">
                <div className="cart-total-row">
                    <span>Total:</span>
                    <span className="cart-total-amount">${totalPrice.toFixed(2)}</span>
                </div>
                <button
                    type="button"
                    className="checkout-btn"
                    disabled={items.length === 0}
                >
                    Checkout
                </button>
            </div>
        </aside>
    );
} 