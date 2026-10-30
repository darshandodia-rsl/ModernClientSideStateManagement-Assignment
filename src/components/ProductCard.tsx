import { useCartStore } from '../store/useCartStore';
import type { Product } from '../types/cart';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    // Subscribing strictly to the action: this component NEVER re-renders on cart changes
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div className="product-card">
            <h3>{product.name}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button type="button" onClick={() => addItem(product)}>
                Add to Cart
            </button>
        </div>
    );
}  