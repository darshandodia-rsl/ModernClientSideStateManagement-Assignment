import { useCartDispatch } from '../context/CartContext';                    
import type { Product } from '../types/cart';                                
                                                                             
interface ProductCardProps {                                                 
  product: Product;                                                          
}                                                                            
                                                                             
export function ProductCard({ product }: ProductCardProps) {                 
  const dispatch = useCartDispatch();                                        
                                                                             
  return (                                                                   
    <div className="product-card">                                           
      <h3>{product.name}</h3>                                                
      <p className="product-price">${product.price.toFixed(2)}</p>           
      <button                                                                
        type="button"                                                        
        onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}     
      >                                                                      
        Add to Cart                                                          
      </button>                                                              
    </div>                                                                   
  );                                                                         
}  