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
            <img src={product.api_featured_image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover"}} />
            <div className='DetailSection'>
                <DetailText text={product.name} fontSize={22} color="red"/>
                <DetailText text={product.brand} fontSize={18} color="red"/>
                <DetailText text={`$${toUSD}`} fontSize={15} color="red"/>
            </div>
        </div>
    );
}

export default ProductCard;

                /*
                <p style={{fontSize: "20px"}}>{product.name}</p>
                <p>{product.brand}</p>
                <p>${toUSD}</p>
                */