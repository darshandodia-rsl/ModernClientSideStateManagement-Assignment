import type { CartItem } from '../types/cart';

interface CartItemsListProps {
    items: CartItem[];
    onRemoveItem: (id: string) => void;
}

export function CartItemsList({ items, onRemoveItem }: CartItemsListProps) {
    if (items.length === 0) {
        return <p className="cart-empty-msg">Your cart is empty.</p>; 
    }

    return (
        <ul className="cart-items-list">
            {items.map((item) => (
                <li key={item.id} className="cart-item-row"> 
                    <div className="cart-item-info">
                        <span className="cart-item-name">{item.name}</span>
                        <span className="cart-item-meta">{item.quantity} × ${item.price.toFixed(2)} </span>
                    </div>

                    <div className="cart-item-actions">
                        <span className="class-item-subtotal">
                            ${(item.price * item.quantity).toFixed(2)} 
                        </span>
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => onRemoveItem(item.id)}
                        >
                            Remove
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}