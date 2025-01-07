/**
 * @fileoverview Display different types of lip products from various brands.
 * 
 * @author Brittney Oeur
 * @date January 3, 2025
 * 
 * @description
 * A React component that lists all available lip products retrieved from the Makeup API. 
 * Each product is displayed as a clickable card, allowing users to navigate to a 
 * dedicated page with detailed information about the selected product.
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
                const response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick${queryString}`);
                console.log(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick${queryString}`);
    
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
        return <p style={{ color: "black" }}>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: "black" }}>Error: {error}</p>
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