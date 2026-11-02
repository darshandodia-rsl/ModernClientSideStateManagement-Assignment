import { CheckoutMachineContext } from '../machines/CheckoutContext';

export function CartErrorBanner() {
    const error = CheckoutMachineContext.useSelector(
        (snapshot) => snapshot.context.error
    );

    if (!error) return null;

    return (
        <div className="cart-error-banner" role="alert">
            <span>{error}</span>
        </div>
    );
}