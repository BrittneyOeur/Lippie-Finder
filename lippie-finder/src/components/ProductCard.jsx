import '/src/card.css'

function ProductCard({ product, onClick }) {
    return (
        <div className='Card' onClick={onClick}>
            <img src={product.api_featured_image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover"}} />
            <h3>{product.name}</h3>
            <p>{product.brand}</p>
            <sub>{product.price}</sub>
        </div>
    );
}

export default ProductCard;