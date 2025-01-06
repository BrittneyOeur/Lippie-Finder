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

import '/src/card.css'

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
    const toUSD = Number(product.price * 0.71).toFixed(2);

    return (
        <div className='Card' onClick={onClick} style={{cursor: "pointer"}}>
            <img src={product.api_featured_image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover", backgroundColor: "white" }} />
            <div className='DetailSection'>
                <DetailText text={product.name} fontSize={22} color="rgb(27, 27, 27)"/>
                <DetailText text={product.brand} fontSize={18} color="rgb(122, 48, 48)"/>
                <DetailText text={`$${toUSD} (USD)`} fontSize={15} color="rgb(182, 65, 65)"/>
            </div>
        </div>
    );
}

export default ProductCard;