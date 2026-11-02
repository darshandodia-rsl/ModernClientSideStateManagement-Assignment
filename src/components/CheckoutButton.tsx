import { CheckoutMachineContext } from '../machines/CheckoutContext';

export function CheckoutButton() {
    const actorRef = CheckoutMachineContext.useActorRef();

    // Declarative query: Is the machine capable of transitioning on SUBMIT right now?                                                                 
    const canSubmit = CheckoutMachineContext.useSelector((snapshot) =>
        snapshot.can({ type: 'SUBMIT' })
    );

    return (
        <button
            type="button"
            className="checkout-btn"
            disabled={!canSubmit}
            onClick={() => actorRef.send({ type: 'SUBMIT' })}
        >
            Proceed to Checkout
        </button>
    );
}    