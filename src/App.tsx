 import { useState } from 'react';                                            
import type { CartItem, Product } from './types/cart';                       
import { Header } from './components/Header';                                
import { Catalog } from './components/Catalog';                              
import { CartDrawer } from './components/CartDrawer';                        
import './App.css';

export default function App() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const handleAddToCart = (product: Product) => {
        setCartItems((prevItems) => {
            const existing = prevItems.find((item) => item.id === product.id);
            if (existing) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const handleRemoveItem = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="app-container"> 
            <Header cartCount={totalCount} />
            <div className="app-main"> 
                <Catalog onAddToCart={handleAddToCart} />
                <CartDrawer
                    items={cartItems}
                    totalPrice={totalPrice}
                    onRemoveItem={handleRemoveItem}
                />
            </div>
        </div>
    );
}