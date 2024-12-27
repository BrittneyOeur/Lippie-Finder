import ProductCard from "./ProductCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ProductGrid({ filters }) {
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
                  queryParams.push(`brand=${filters.brand.join(",")}`);
              }
              if (filters.category.length > 0) {
                  queryParams.push(`category=${filters.category.join(",")}`);
              }
              if (filters.tag.length > 0) {
                  queryParams.push(`tag_list=${filters.tag.join(",")}`);
              }
  
              const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
              const response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick${queryString}`);
  
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
  }, [filters]); // Re-run whenever filters change
  


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