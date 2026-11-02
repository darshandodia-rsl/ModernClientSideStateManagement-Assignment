import { assign, fromPromise, setup } from 'xstate';
import { createOrder } from '../api/orders';
import type { CartItem, CheckoutResult } from '../types/cart';

export interface CheckoutContext {
    items: CartItem[];
    error: string | null;
    orderResult: CheckoutResult | null;
}

export type CheckoutEvent =
    | { type: 'UPDATE_CART'; items: CartItem[] }
    | { type: 'SUBMIT' }
    | { type: 'CANCEL' }
    | { type: 'RESET' };

export const checkoutMachine = setup({
    types: {
        context: {} as CheckoutContext,
        events: {} as CheckoutEvent,
    },
    actors: {
        paymentActor: fromPromise<
            CheckoutResult,
            { items: CartItem[]; total: number }> (async ({ input, signal }) => {
            return await createOrder(input, signal);
        }),
    },
    guards: {
        isCartNotEmpty: ({ context }) => context.items.length > 0,
    },
}).createMachine({
    id: 'checkout',
    initial: 'reviewing',
    context: {
        items: [],
        error: null,
        orderResult: null,
    },
    on: {
        UPDATE_CART: {
            actions: assign({
                items: ({ event }) => event.items,
            }),
        },
    },
    states: {
        reviewing: {
            on: {
                SUBMIT: {
                    guard: 'isCartNotEmpty',
                    target: 'submitting',
                    actions: assign({ error: null }),
                },
            },
        },

        submitting: {
            invoke: {
                src: 'paymentActor',
                input: ({ context }) => ({
                    items: context.items,
                    total: context.items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    ),
                }),
                onDone: {
                    target: 'success',
                    actions: assign({
                        orderResult: ({ event }) => event.output,
                        error: null,
                    }),
                },
                onError: {
                    target: 'reviewing',
                    actions: assign({
                        error: ({ event }) =>
                            event.error instanceof Error
                                ? event.error.message
                                : 'Payment submission failed',
                    }),
                },
            },
            on: {
                CANCEL: {
                    target: 'reviewing',
                    actions: assign({ error: null }),
                },
            },
        },

        success: {
            on: {
                RESET: {
                    target: 'reviewing',
                    actions: assign({
                        items: [],
                        orderResult: null,
                        error: null,
                    }),
                },
            },
        },
    },
});