import { CartBadge } from './CartBadge';

export function Toolbar() {
    return (
        <div className="toolbar">
            <h1>Shop Cart</h1>
            <div className="cart-badge-container">
                <span>Cart Items:</span>
                <CartBadge />
            </div>
        </div>
    );
} 