import ProductGrid from "./ProductGrid";
import { useNavigate } from "react-router-dom";

// Functional Component
function Button({text, color, width, fontSize}){
    const buttonStyle = {
        color: color,
        fontSize: fontSize + 'px',
        width: width
    };

    return (
        <button style={buttonStyle}>{text}</button>
    );
}

function TopPart() {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    }

    return (
        <div className="topContainer">
            <h1 onClick={handleLogoClick} 
                style={{cursor: "pointer", width: "17vw", margin: "auto", marginTop: "50px", marginBottom: "20px"}}
            >
                    Lippie Finder
            </h1>
            
            <div className="container">
                <input className="searchBar"
                        type="text"
                        name="search" 
                        placeholder="Search lip product..." 
                        style={{ marginRight: "10px", padding: "6px", width: "220px" }} />

                <Button text="Search" color="white" width="70px" fontSize={12} />
            </div>

            <div className="filterSort" style={{ display: "flex", padding: "15px", gap: "15px" }}>
                <Button text="Filter" color="white"  width="100px" fontSize={12} />
                <Button text="Sort" color="white"  width="100px" fontSize={12} />
            </div>
        </div>
    );
}

export default TopPart;