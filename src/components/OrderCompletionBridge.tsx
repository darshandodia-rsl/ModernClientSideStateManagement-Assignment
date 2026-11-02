import { useEffect } from 'react';
import { CheckoutMachineContext } from '../machines/CheckoutContext';
import { useCartStore } from '../store/useCartStore';

export function OrderCompletionBridge() {
    const isSuccess = CheckoutMachineContext.useSelector((snapshot) =>
        snapshot.matches('success')
    );
    const clearCart = useCartStore((state) => state.clearCart);

    useEffect(() => {
        if (isSuccess) {
            clearCart();
        }
    }, [isSuccess, clearCart]);

    // Headless: renders nothing                                               
    return null;
}  