/* 
 Page includes detailed information on an specific product, which will include:
 - Brand Name
 - Product Name
 - Price
 - Description

 Users will be able to click any of the existing colors the product may have, 
 which will change the background color to that color

 Users may also click on the hyperlink that redirects them to the product page,
 where they are able to purchase the product
*/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '/src/details.css'

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [backgroundColor, setBackGroundColor] = useState(null);

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
    }

    return (
        <>
            <div className="containerGrid" style={{ backgroundColor: backgroundColor, paddingLeft: "300px", paddingRight: "300px" }}>
                <div className="anotherContainer" style={{ display: "flex", flexDirection: "row", margin: "auto", backgroundColor: "rgba(0, 0, 0, 0.28)" }}>
                    <div className="productSection" style={{ backgroundColor: "white" }}>
                        <h1>{product.name}</h1>
                        <img src={product.api_featured_image} alt={product.name} style={{width: "15vw", margin: "auto"}}/>
                        <a href="{product.website_link}">{product.brand}</a>
                        <p>{product.price}</p>
                    </div>
                    <div className="productDescription" style={{ padding: "50px", textAlign: "left", color: "white" }}>
                        <div className="productColors" style={{  display: "flex", margin: "auto", gap: "15px" }}>
                            <h2>Select color: </h2>
                            {colors.map((color, index) => (
                                <p className="colors" key={index} onClick={() => changeBackgroundColor(color.hex_value)} style={{ cursor: "pointer" }}>{color.colour_name}</p>
                            ))}
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