import { selectTotalCount, useCartStore } from '../store/useCartStore';

export function CartBadge() {
    // Only re-renders when the derived item count changes                     
    const count = useCartStore(selectTotalCount);

    return (
        <span className="badge-count" aria-label={`${count} items in cart`}>
            {count}
        </span>
    );
}  