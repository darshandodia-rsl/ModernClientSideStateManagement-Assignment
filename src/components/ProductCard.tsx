import { useSetAtom } from 'jotai';
import { addItemAtom } from '../atoms/cartAtoms';
import type { Product } from '../types/cart';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    // Action-only hook: this component NEVER re-renders on cart changes       
    const addItem = useSetAtom(addItemAtom);

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