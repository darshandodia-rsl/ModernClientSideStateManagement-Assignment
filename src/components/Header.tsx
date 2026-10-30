import { Toolbar } from './Toolbar';

interface HeaderProps {
    cartCount: number;
}

export function Header({ cartCount }: HeaderProps) {
    return (
        <header className="header">
            <Toolbar cartCount={cartCount} />
        </header>
    );
}