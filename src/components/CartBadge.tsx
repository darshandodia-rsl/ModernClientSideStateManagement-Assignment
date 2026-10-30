import { useCartState } from '../context/CartContext';

export function CartBadge() {
    const { items } = useCartState();
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <span className="badge-count" aria-label={`${count} items in cart`}>
            {count}
        </span>
    );
} 