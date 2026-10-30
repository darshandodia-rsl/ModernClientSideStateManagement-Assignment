import { CartBadge } from './CartBadge';               

interface ToolbarProps {
    cartCount: number;
}

export function Toolbar({ cartCount }: ToolbarProps) {
    return (
        <div className="toolbar">
            <h1>Shop Cart</h1>
            <div className="cart-badge-container">
                <span>Cart Items:</span>                       
                <CartBadge count={cartCount}/>  
            </div>
        </div>
    );
}
