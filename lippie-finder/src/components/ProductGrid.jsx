import ProductCard from "./ProductCard";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lipstick")
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("ERROR: Server error");
                }
                return response.json();
            })

            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            })  
    }, []);

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