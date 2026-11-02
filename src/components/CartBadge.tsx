import { useAtomValue } from 'jotai';
import { totalCountAtom } from '../atoms/cartAtoms';

export function CartBadge() {
    // Subscribes strictly to the derived total count atom                     
    const count = useAtomValue(totalCountAtom);

    return (
        <span className="badge-count" aria-label={`${count} items in cart`}>
            {count}
        </span>
    );
}   