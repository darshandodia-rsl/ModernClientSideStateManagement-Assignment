interface CartBadgeProps {
    count: number;
}

export function CartBadge({ count }: CartBadgeProps) {
    return (
        <span className="badge-count" aria-label={`${count} items in cart`}>
            {count}
        </span>
    );
}