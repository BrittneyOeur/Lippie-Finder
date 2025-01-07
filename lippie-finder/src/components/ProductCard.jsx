/**
 * @fileoverview Display individual lip products
 * 
 * @author Brittney Oeur
 * @date January 3, 2025
 * 
 * @description
 * A React component that represents an individual lip product displayed 
 * within the 'ProductGrid.jsx' component. It includes details such as 
 * the product's name, brand, and price.
 * 
 * @dependencies
 * - /src/card.css (for styling)
 */

import "/src/card.css"

function DetailText({ text, fontSize, color }) {
    const textStyle = {
        color: color, 
        fontSize: fontSize + "px"
    };

    return (
        <p style={textStyle}>{text}</p>
    );
}

function ProductCard({ product, onClick }) {
    const toUSD = Number(product.price * 0.71 === 0) ? "N/A" : Number(product.price * 0.71).toFixed(2);

    return (
        <div className="Card" 
            onClick={onClick} 
            style={{ 
                cursor: "pointer", 
                borderColor: "#9c6f74", 
                borderStyle: "solid", 
                borderWidth: "2px" 
            }}>
            <img src={product.api_featured_image} 
                alt={product.name} 
                style={{ 
                    width: "100%", 
                    height: "200px", 
                    objectFit: "cover", 
                    backgroundColor: "white" 
                    }}
            />
            <div className='DetailSection'>
                <DetailText text={product.name} fontSize={22} color="#ffffff"/>
                <DetailText text={product.brand} fontSize={18} color="#805459"/>
                <DetailText text={`$${toUSD} (USD)`} fontSize={15} color="#9c6f74"/>
            </div>
        </div>
    );
}

export default ProductCard;