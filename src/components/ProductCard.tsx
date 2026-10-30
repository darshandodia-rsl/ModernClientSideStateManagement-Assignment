import type { Product } from '../types/cart';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <div className="product-card">
            <h3> {product.name} </h3>
            <p className="product-price"> ${product.price.toFixed(2)} </p>
            <button className="add-to-cart-button" onClick={() => onAddToCart(product)}>
                Add to Cart
            </button>
        </div>
    );
}