import {                                                                     
  createContext,                                                             
  useContext,                                                                
  useReducer,                                                                
  type Dispatch,                                                             
  type ReactNode,                                                            
} from 'react';                                                              
import {                                                                     
  cartReducer,                                                               
  initialCartState,                                                          
  type CartAction,                                                           
  type CartState,                                                            
} from './cartReducer';

// 1. Create separate contexts with null as initial value   
const CartStateContext = createContext<CartState | null>(null);              
const CartDispatchContext = createContext<Dispatch<CartAction> | null>(null)

// 2. CartProvider wrapping children in both contexts                        
interface CartProviderProps {                                                
  children: ReactNode;                                                       
}                                                                            
                                                                             
export function CartProvider({ children }: CartProviderProps) {              
  const [state, dispatch] = useReducer(cartReducer, initialCartState);       
                                                                             
  return (                                                                   
    <CartStateContext.Provider value={state}>                                
      <CartDispatchContext.Provider value={dispatch}>                        
        {children}                                                           
      </CartDispatchContext.Provider>                                        
    </CartStateContext.Provider>                                             
  );                                                                         
}  

// 3. Custom Consumer Hook for State (with Safety Guard)                     
export function useCartState(): CartState {                                  
  const context = useContext(CartStateContext);                              
  if (!context) {                                                            
    throw new Error('useCartState must be used within a CartProvider');      
  }                                                                          
  return context;                                                            
}                                                                            
                                                                             
// 4. Custom Consumer Hook for Dispatch (with Safety Guard)                  
export function useCartDispatch(): Dispatch<CartAction> {                    
  const context = useContext(CartDispatchContext);                           
  if (!context) {                                                            
    throw new Error('useCartDispatch must be used within a CartProvider');   
  }                                                                          
  return context;                                                            
} 