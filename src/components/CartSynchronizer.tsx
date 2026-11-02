import { useEffect } from 'react';
import { CheckoutMachineContext } from '../machines/CheckoutContext';
import { useCartStore } from '../store/useCartStore';

export function CartSynchronizer() {
    const items = useCartStore((state) => state.items);
    const actorRef = CheckoutMachineContext.useActorRef();

    useEffect(() => {
        actorRef.send({ type: 'UPDATE_CART', items });
    }, [items, actorRef]);

    // Headless: renders nothing                                               
    return null;
}   