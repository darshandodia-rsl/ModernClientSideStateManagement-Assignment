import { useShallow } from 'zustand/react/shallow';
import { selectTotalPrice, useCartStore } from '../store/useCartStore';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
    const { items, status, error, checkout } = useCartStore(
        useShallow((state) => ({
            items: state.items,
            status: state.status,
            error: state.error,
            checkout: state.checkout,
        }))
    );

    const totalPrice = useCartStore(selectTotalPrice);
    const isSubmitting = status === 'submitting';

    return (
        <aside className="cart-drawer">
            <h2>Your Cart</h2>

            {status === 'success' && (
                <p className="cart-success-msg">Order placed successfully!</p>
            )}

            {status === 'error' && error && (
                <p className="cart-error-msg">{error}</p>
            )}

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
                    onClick={checkout}
                    disabled={items.length === 0 || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Checkout'}
                </button>
            </div>
        </aside>
    );
}