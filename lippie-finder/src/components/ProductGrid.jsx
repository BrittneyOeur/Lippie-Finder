/**
 * @fileoverview Display different types of lip products from various brands.
 * 
 * @author Brittney Oeur
 * @date January 3, 2025
 * 
 * @description
 * This React component is where it lists out all the existing lip products (coming from Makeup API),
 * where users are able to click any of the product card,
 * which will redirect them to a dedicated page of the product
 * 
 * @dependencies
 * - React (for the building component)
 * - react-router-dom (for accessing URL parameters)
 */

import ProductCard from "./ProductCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ProductGrid({ search, filters }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
      const fetchFilteredProducts = async () => {
          setLoading(true);
          setError(null);
  
            try {
                const queryParams = [];
    
                if (filters.brand.length > 0) {
                    queryParams.push(filters.brand.map((brand) => `brand=${(brand)}`).join("&"));
                }
                if (filters.category.length > 0) {
                    queryParams.push(filters.category.map((category) => `product_category=${(category)}`).join("&"));
                }
                if (filters.tag.length > 0) {
                    queryParams.push(filters.tag.map((tag) => `product_tags=${(tag)}`).join("&"));
                }

                if (search) {
                    queryParams.push(`brand=${encodeURIComponent(search)}`);
                }
    
                const queryString = queryParams.length > 0 ? `&${queryParams.join("&")}` : "";
                const response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick${queryString}`);
                console.log(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick${queryString}`);
    
                if (!response.ok) {
                    throw new Error("ERROR: Server error");
                }
    
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchFilteredProducts();
    }, [search, filters]); // Re-run whenever filters change
    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
    }

    return (
        <div className="containerGrid">
            <div style={{display: "flex", flexWrap: "wrap", gap: "70px 70px", justifyContent: "center"}}>
                {products.map((product) => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                        onClick={() => handleCardClick(product.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductGrid;