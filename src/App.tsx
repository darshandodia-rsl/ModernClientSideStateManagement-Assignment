import { CheckoutMachineContext } from './machines/CheckoutContext';
import { CartSynchronizer } from './components/CartSynchronizer';
import { OrderCompletionBridge } from './components/OrderCompletionBridge';
import { Header } from './components/Header';
import { Catalog } from './components/Catalog';
import { CartDrawer } from './components/CartDrawer';
import { PaymentPanel } from './components/PaymentPanel';
import './App.css';

export default function App() {
    return (
        <CheckoutMachineContext.Provider>
            <CartSynchronizer />
            <OrderCompletionBridge />

            <div className="app-container">
                <Header />
                <div className="app-main">
                    <Catalog />
                    <CartDrawer />
                    <PaymentPanel />
                </div>
            </div>
        </CheckoutMachineContext.Provider>
    );
} 