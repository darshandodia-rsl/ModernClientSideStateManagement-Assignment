import { CheckoutMachineContext } from '../machines/CheckoutContext';

export function PaymentPanel() {
    const actorRef = CheckoutMachineContext.useActorRef();

    const stateValue = CheckoutMachineContext.useSelector(
        (snapshot) => snapshot.value
    );
    const orderResult = CheckoutMachineContext.useSelector(
        (snapshot) => snapshot.context.orderResult
    );
    const error = CheckoutMachineContext.useSelector(
        (snapshot) => snapshot.context.error
    );
    const canSubmit = CheckoutMachineContext.useSelector((snapshot) =>
        snapshot.can({ type: 'SUBMIT' })
    );

    const isSubmitting = stateValue === 'submitting';
    const isSuccess = stateValue === 'success';

    return (
        <section className="payment-panel">
            <h2>Payment & Order Gateway</h2>
            <div className="payment-status-badge">
                Status: <strong>{String(stateValue).toUpperCase()}</strong>
            </div>

            {stateValue === 'reviewing' && (
                <div className="payment-content">
                    <p>Ready to process your order with mock json-server.</p>
                    {error && <div className="payment-error-alert">{error}</div>}
                    <button
                        type="button"
                        className="submit-payment-btn"
                        disabled={!canSubmit}
                        onClick={() => actorRef.send({ type: 'SUBMIT' })}
                    >
                        Submit Payment
                    </button>
                </div>
            )}

            {isSubmitting && (
                <div className="payment-content payment-processing">
                    <p className="processing-text">
                        Processing payment with json-server (1.5s delay)...
                    </p>
                    <button
                        type="button"
                        className="cancel-payment-btn"
                        onClick={() => actorRef.send({ type: 'CANCEL' })}
                    >
                        Cancel Payment (Abort Request)
                    </button>
                </div>
            )}

            {isSuccess && (
                <div className="payment-content payment-success">
                    <h3>Order Confirmed!</h3>
                    <p>
                        Order ID: <strong>{orderResult?.id}</strong>
                    </p>
                    <p>Total Paid: ${orderResult?.total.toFixed(2)}</p>
                    <button
                        type="button"
                        className="reset-btn"
                        onClick={() => actorRef.send({ type: 'RESET' })}
                    >
                        Start New Order
                    </button>
                </div>
            )}
        </section>
    );
}