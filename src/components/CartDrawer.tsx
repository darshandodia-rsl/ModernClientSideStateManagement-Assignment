import { useAtomValue, useSetAtom } from 'jotai';
import {
    cartItemsAtom,
    clearCartAtom,
    totalPriceAtom,
} from '../atoms/cartAtoms';
import { CartItemsList } from './CartItemsList';

export function CartDrawer() {
    const items = useAtomValue(cartItemsAtom);
    const totalPrice = useAtomValue(totalPriceAtom);
    const clearCart = useSetAtom(clearCartAtom);

    return (
        <aside className="cart-drawer">
            <div className="cart-drawer-header">
                <h2>Your Cart</h2>
                {items.length > 0 && (
                    <button
                        type="button"
                        className="clear-cart-btn"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                )}
            </div>

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