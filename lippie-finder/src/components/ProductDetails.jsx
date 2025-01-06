/**
 * @fileoverview Displays detailed informtion on selected lip product.
 * 
 * @author Brittney Oeur
 * @date January 3, 2025
 * 
 * @description
 * This React component fetches and displays the details of a lip product
 * based on the 'id' obtained from the URL. It shows the product's name,
 * image, price, description, available colors, and brand.
 * Users can click on a color to update the background color of the page.
 * 
 * @dependencies
 * - React (for the building component)
 * - react-router-dom (for accessing URL parameters)
 * - /src/details.css (for styling)
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '/src/details.css'

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [backgroundColor, setBackGroundColor] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null); // Track the selected color

    useEffect(() => {
        fetch(`http://makeup-api.herokuapp.com/api/v1/products/${id}.json`)
            .then((response) => response.json())
            .then((data) => setProduct(data));
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    const colors = product.product_colors;

    const changeBackgroundColor = (color) => {
        setBackGroundColor(color);
        setSelectedColor(color); // Track the selected color
    }

    const toUSD = Number(product.price * 0.71).toFixed(2);

    return (
        <>
            <div className="containerGrid" style={{ backgroundColor: backgroundColor, paddingLeft: "300px", paddingRight: "300px" }}>
                <div className="anotherContainer">
                    <div className="productSection" style={{ backgroundColor: "white" }}>
                        <h1>{product.name}</h1>
                        <img src={product.api_featured_image} alt={product.name} style={{width: "15vw", margin: "auto"}}/>
                        <div style={{ display: "flex", justifyContent: "center", textAlign: "center", alignItems: "center", fontSize: "25px" }}>
                            <p>Store: </p>
                            <a href={product.website_link} style={{ display: "flex", justifyContent: "center", textAlign: "center", marginLeft: "10px" }}>{product.brand}</a>
                        </div> 
                        <p style={{ fontSize: "20px" }}>{`$${toUSD} (USD)`}</p>
                    </div>
                    <div className="productDescription" style={{ padding: "50px", textAlign: "left", color: "white", overflow: "hidden", width: "50vw" }}>
                        <div className="productColors">
                            <h2>Select color: </h2>
                            {colors.map((color, index) => (
                                <p 
                                    className="colors" 
                                    key={index} 
                                    onClick={() => changeBackgroundColor(color.hex_value)} 
                                    style={{ cursor: "pointer", color: selectedColor === color.hex_value ? "black" : "white", // Highlight the selected color
                                    }}
                                >
                                    {color.colour_name}
                                </p>
                            ))}
                        </div>
                        <div style={{ display: "flex"}}>
                            <h2>Type: </h2>
                            <p style={{ padding: "9px", textTransform: "capitalize", fontSize: "18px" }}>{(product.category).replace("_", " ")}</p>
                        </div>
                        
                        <h2>Description: </h2>  
                        <p>{product.description}</p>   
                    </div>
                </div> 
            </div>
        </>
    );
}

export default ProductDetails;