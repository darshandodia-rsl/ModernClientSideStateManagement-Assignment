import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import './App.css';

export default function App() {
    return (
        <CartProvider>
            <div className="app-container">
                <Header />
                <div className="app-main">
                    <Catalog />
                    <CartDrawer />
                </div>
            </div>
        </CartProvider>
    );
} 