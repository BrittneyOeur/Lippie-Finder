import React, { useEffect, useState } from "react";

function FilterList({ text, onClick }) {
    const filterStyle = {
        cursor: "pointer",
        listStyle: "none",
        margin: "5px 0",
    };

    return (
        <li style={filterStyle} onClick={onClick}>
            {text}
        </li>
    );
}

function Filter({ filters, onFilterChange }) {
    const [currentPage, setCurrentPage] = useState("main");
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleBack = () => {
        setCurrentPage("main");
    };

    useEffect(() => {
        fetch("https://makeup-api.herokuapp.com/api/v1/products.json")
            .then((response) => {
                if (response.status >= 400) {
                    throw new Error("ERROR: Server error");
                }
                return response.json();
            })
            .then((data) => {
                // Extract unique brands
                const uniqueBrands = [...new Set(data.map((item) => item.brand).filter(Boolean))];
                setBrands(uniqueBrands);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading options...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="filter-container">
            {currentPage === "main" && ( // Main filter page
                <div>
                    <div>
                        <h2>Filter Options</h2>
                    </div>
                    <div className="filter-options" style={{ display: "flex" }}>
                        <h1>BRAND</h1>
                        <h2
                            style={{ cursor: "pointer", color: "blue", paddingTop: "5px", marginLeft: "300px", fontWeight: "900", fontSize: "50px" }}
                            onClick={() => setCurrentPage("brand")}
                        >
                            &gt;
                        </h2>
                    </div>
                </div>
            )}

            {currentPage === "brand" && ( // Brand filter page
                <div>
                    <h2>Choose a Brand</h2>
                    <ul style={{ padding: 0 }}>
                        {brands.map((brand) => (
                            <FilterList
                                key={brand}
                                text={brand}
                                onClick={() => onFilterChange("brand", brand)}
                            />
                        ))}
                    </ul>
                    <button onClick={handleBack} style={{ marginTop: "10px" }}>
                        Back
                    </button>
                </div>
            )}
        </div>
    );
}

export default Filter;
