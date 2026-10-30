import { useEffect, useState } from "react";
import { fetchProducts } from "../api/products";
import type { Product } from "../types/cart";
import { ProductCard } from "./ProductCard";

export function Catalog() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        
        async function loadProducts() {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchProducts(controller.signal);
                setProducts(data);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") {
                    return; // Fetch was aborted, do nothing
                }
                setError(err instanceof Error ? err.message : "Failed to load products");
            } finally {
                setLoading(false);
            }
        }

        loadProducts();

        return () => {
            controller.abort();
        };
    }, []);

    return (                                                                   
      <section className="catalog">                                            
        <h2>Products</h2>                                                      
        {loading && <p>Loading catalog...</p>}                                 
        {error && <p className="catalog-error">{error}</p>}                    
        {!loading && !error && (                                               
          <div className="product-grid">                                       
            {products.map((product) => (                                       
              <ProductCard key={product.id} product={product} />               
            ))}                                                                
          </div>                                                               
        )}                                                                     
      </section>                                                               
    ); 
}