import { selectTotalPrice, useCartStore } from '../store/useCartStore';
import { CartErrorBanner } from './CartErrorBanner';
import { CartItemsList } from './CartItemsList';
import { CheckoutButton } from './CheckoutButton';

export function CartDrawer() {
    const totalPrice = useCartStore(selectTotalPrice);

    return (
        <aside className="cart-drawer">
            <h2>Your Cart</h2>

            <CartErrorBanner />

            <div className="cart-drawer-content">
                <CartItemsList />
            </div>

            <div className="cart-footer">
                <div className="cart-total-row">
                    <span>Total:</span>
                    <span className="cart-total-amount">${totalPrice.toFixed(2)}</span>
                </div>

                <CheckoutButton />
            </div>
        </aside>
    );
}  